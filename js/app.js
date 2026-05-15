// ===== 配置 =====
const CONTENT_DIR = 'content/';   // Markdown 文件目录
const NAV_FILE = 'nav.json';      // 导航配置文件

// ===== 主题切换 =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');

// 获取初始主题：localStorage > 系统偏好 > 默认亮色
function getTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
}

// 初始化主题
applyTheme(getTheme());

// 绑定事件
themeToggle?.addEventListener('click', toggleTheme);

// 监听系统主题变化（如果用户没手动设置过）
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// ===== 状态 =====
let navData = [];                 // 导航数据
let contentCache = {};            // 预加载的内容缓存
let currentPage = null;

// ===== DOM 元素 =====
const sidebarNav = document.getElementById('sidebarNav');
const content = document.getElementById('content');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// ===== 初始化 =====
async function init() {
  await loadNav();
  buildSidebar();
  handleRoute();
  setupSearch();
  setupMobile();

  // 配置 marked
  marked.setOptions({
    highlight: function(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return code;
    },
    breaks: true,
  });

  window.addEventListener('hashchange', handleRoute);
}

// ===== 加载导航配置 =====
async function loadNav() {
  try {
    const res = await fetch(NAV_FILE);
    const data = await res.json();
    navData = data.nav || [];
    document.querySelector('.site-title').textContent = data.title || '📚 文档库';
    document.title = data.title || '文档库';
  } catch (err) {
    console.error('加载导航失败:', err);
    sidebarNav.innerHTML = '<p style="padding:20px;color:var(--text-secondary)">导航加载失败</p>';
  }
}

// ===== 构建侧边栏 =====
function buildSidebar() {
  let html = '';
  navData.forEach((group, gi) => {
    const collapsed = group.collapsed ? ' collapsed' : '';
    const icon = group.icon || '';
    html += `<div class="nav-group${collapsed}">`;
    html += `<div class="nav-group-title" data-group="${gi}"><span class="arrow">▼</span> ${icon} ${group.title}</div>`;
    html += `<div class="nav-group-items">`;
    (group.items || []).forEach(item => {
      html += `<a class="nav-item" href="#${item.file}">${item.title}</a>`;
    });
    html += `</div></div>`;
  });
  sidebarNav.innerHTML = html;

  // 折叠/展开
  sidebarNav.querySelectorAll('.nav-group-title').forEach(title => {
    title.addEventListener('click', () => {
      title.parentElement.classList.toggle('collapsed');
    });
  });
}

// ===== 路由处理 =====
async function handleRoute() {
  const hash = window.location.hash.slice(1); // 去掉 #
  const file = hash || (navData[0]?.items?.[0]?.file);

  if (!file) return;
  if (file === currentPage) return;
  currentPage = file;

  // 更新侧边栏高亮
  sidebarNav.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === `#${file}`);
  });

  // 展开包含当前页的导航组
  sidebarNav.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('href') === `#${file}`) {
      const group = item.closest('.nav-group');
      if (group) group.classList.remove('collapsed');
    }
  });

  // 关闭移动端侧边栏
  closeSidebar();

  // 加载并渲染内容
  await loadAndRender(file);
}

// ===== 加载并渲染 Markdown =====
async function loadAndRender(file) {
  content.innerHTML = '<div class="content-inner"><p style="color:var(--text-secondary)">加载中...</p></div>';

  try {
    // 优先使用缓存
    if (!contentCache[file]) {
      const res = await fetch(`${CONTENT_DIR}${file}`);
      if (!res.ok) throw new Error('文件未找到');
      contentCache[file] = await res.text();
    }

    const md = contentCache[file];
    const html = marked.parse(md);
    content.innerHTML = `<div class="content-inner">${html}</div>`;

    // 滚动到顶部
    content.scrollTop = 0;
    window.scrollTo(0, 0);

  } catch (err) {
    content.innerHTML = `
      <div class="content-inner">
        <h1>😵 页面未找到</h1>
        <p>找不到文件 <code>${CONTENT_DIR}${file}</code></p>
        <p>请确认该文件存在于 content 目录下。</p>
      </div>`;
  }
}

// ===== 搜索功能 =====
async function setupSearch() {
  // 防御性检查：确保 searchResults 元素存在
  if (!searchResults) {
    console.error('searchResults 元素不存在');
    return;
  }

  let searchTimeout;
  let preloading = true;   // 标记是否正在预加载文档

  // 预加载所有内容用于搜索
  async function preloadAll() {
    for (const group of navData) {
      for (const item of (group.items || [])) {
        if (!contentCache[item.file]) {
          try {
            const res = await fetch(`${CONTENT_DIR}${item.file}`);
            if (res.ok) {
              contentCache[item.file] = await res.text();
            }
          } catch(e) { /* skip */ }
        }
      }
    }
  }

  // 搜索执行
  function performSearch(query) {
    const q = query.toLowerCase();
    const results = [];

    // 如果缓存完全为空，说明还在预加载，显示等待提示并触发加载
    if (Object.keys(contentCache).length === 0) {
      searchResults.innerHTML = '<div class="no-results">正在索引文档，请稍候...</div>';
      searchResults.classList.add('active');
      preloadAll().then(() => {
        // 加载完成后重新搜索相同关键词
        performSearch(query);
      });
      return;
    }

    for (const group of navData) {
      for (const item of (group.items || [])) {
        const raw = contentCache[item.file];
        if (!raw) continue;

        const text = raw.toLowerCase();
        const idx = text.indexOf(q);

        if (idx !== -1) {
          // 提取匹配片段
          const start = Math.max(0, idx - 30);
          const end = Math.min(raw.length, idx + q.length + 60);
          let preview = raw.substring(start, end);
          if (start > 0) preview = '...' + preview;
          if (end < raw.length) preview = preview + '...';

          // 高亮关键词（在原始大小写文本中）
          const previewLower = preview.toLowerCase();
          const highlightStart = previewLower.indexOf(q);
          const before = preview.substring(0, highlightStart);
          const match = preview.substring(highlightStart, highlightStart + q.length);
          const after = preview.substring(highlightStart + q.length);

          results.push({
            title: item.title,
            file: item.file,
            preview: `${escapeHtml(before)}<mark>${escapeHtml(match)}</mark>${escapeHtml(after)}`
          });
        }
      }
    }

    // 渲染搜索结果
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="no-results">没有找到匹配的文档</div>';
    } else {
      searchResults.innerHTML = results.slice(0, 8).map(r => `
        <div class="search-result-item" data-file="${r.file}">
          <div class="match-title">${escapeHtml(r.title)}</div>
          <div class="match-preview">${r.preview}</div>
        </div>
      `).join('');

      // 点击结果跳转
      searchResults.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', () => {
          const file = el.dataset.file;
          window.location.hash = file;
          searchResults.classList.remove('active');
          searchInput.value = '';
        });
      });
    }

    searchResults.classList.add('active');
  }

  // 绑定搜索输入事件
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    const query = searchInput.value.trim();

    if (!query) {
      searchResults.classList.remove('active');
      return;
    }

    searchTimeout = setTimeout(() => performSearch(query), 200);
  });

  // 点击外部关闭搜索结果
  document.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
      searchResults.classList.remove('active');
    }
  });

  // 启动预加载，完成后更新状态
  try {
    await preloadAll();
  } catch (e) {
    console.error('预加载文档失败', e);
  }
  preloading = false;
}

// ===== 移动端 =====
function setupMobile() {
  menuToggle.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', closeSidebar);
}

function toggleSidebar() {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}

// HTML 转义
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== 启动 =====
init();