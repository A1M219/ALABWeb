# 二级标题导航（TOC）📚
## 🧠 整体思路
- CSS 控制导航栏的样式、位置、滚动条、以及在不同屏幕下的显示/隐藏。
- JavaScript 负责动态构建 TOC 列表、监听页面滚动和内容变化，实现点击跳转及当前章节高亮。
## css部分
- .toc-container 主要容器
- 作用：定义一个固定在右侧的导航面板，滚动页面时始终可见，且高度自适应、内容可滚动。
```CSS
position: fixed;        /* 固定定位，滚动页面时保持位置 */
top: 120px;             /* 距离浏览器顶部 120px，避免被网站头部遮挡 */
right: 24px;            /* 距离右侧 24px */
width: 220px;           /* 固定宽度 */
max-height: calc(100vh - 220px); /* 最大高度 = 视口高度 - 220px（留出上下空间） */
overflow-y: auto;       /* 内容过多时出现竖向滚动条 */
z-index: 50;            /* 确保浮在其他内容上面 */
font-size: 0.85rem;     /* 字体大小（相对根元素） */
line-height: 1.7;       /* 行高 */
border-left: 2px solid var(--accent); /* 左侧强调色边框（装饰） */
padding: 0 0 0 16px;    /* 左内边距，让文字与边框有间隔 */
background: var(--bg);  /* 背景颜色（CSS 变量） */
opacity: 0.92;          /* 半透明效果 */
transition: opacity 0.3s; /* 透明度变化过渡 */
border-radius: 0 4px 4px 0; /* 右侧圆角，左侧直角 */
```
- 隐藏无内容的 TOC
- 作用：如果容器内没有任何内容，或者添加了 no-headings 类，就彻底隐藏这个导航栏（避免显示空白块）。
```CSS
.toc-container:empty,
.toc-container.no-headings {
  display: none;
}
```
- .toc-title 标题
- 作用：显示“目录”两个字的样式，让它稍微淡一点，不干扰正文。
```CSS
font-weight: 700;       /* 粗体 */
margin-bottom: 10px;
text-transform: uppercase; /* 字母大写 */
letter-spacing: 0.06em;    /* 字间距 */
opacity: 0.7;
```
- .toc-list 列表容器
- 作用：重置列表样式，便于自定义。
```CSS
list-style: none;   /* 去掉默认项目符号 */
padding: 0;
margin: 0;
```
- .toc-item 单个目录项
- 作用：定义每个标题项的样式，并处理文本过长时显示省略号。
```CSS
padding: 5px 10px;
cursor: pointer;            /* 鼠标变成手型 */
color: var(--text-secondary);
transition: all 0.2s;
border-radius: 6px;
white-space: nowrap;        /* 强制单行 */
overflow: hidden;           /* 超出隐藏 */
text-overflow: ellipsis;    /* 用省略号表示溢出内容 */
```
- 悬停与激活状态
- 鼠标悬停：文字变色 + 浅色背景（8% 强调色）。
- 激活（当前章节）：文字更粗、更深背景（15% 强调色），直观告诉用户正在阅读哪个章节。
```CSS
.toc-item:hover {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}
.toc-item.active {
  color: var(--accent);
  font-weight: 600;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
}
```
- 其他的简单不写了
## JavaScript 部分
- 创建 TOC 容器并插入页面
- 作用：在页面 body 中动态创建固定导航栏结构，并把内部的列表 ul 保存到变量 tocList 中，方便后续操作。
```JavaScript
const tocContainer = document.createElement('div');
tocContainer.className = 'toc-container';
tocContainer.innerHTML = '<div class="toc-title">目录</div><ul class="toc-list"></ul>';
document.body.appendChild(tocContainer);

const tocList = tocContainer.querySelector('.toc-list');
```
- 核心函数 buildTOC()
- 避免重复创建监听器，每次重建 TOC 前先断开旧的监听。
```JavaScript
if (tocObserver) {
  tocObserver.disconnect();
  tocObserver = null;
}
```
- MutationObserver 监听内容变化，自动重建 TOC
- 作用：如果文章内容（.content 内部）发生变化（比如异步加载、用户评论、动态切换章节），就会延迟 150ms 后重新构建 TOC，保证导航始终与最新标题同步。
```JavaScript
const contentArea = document.querySelector('.content');
if (contentArea) {
  const mo = new MutationObserver(() => {
    clearTimeout(mo._timer);
    mo._timer = setTimeout(buildTOC, 150);
  });
  mo.observe(contentArea, { childList: true, subtree: true });
}
```
## 整体工作流程总结
- 页面加载 → JS 创建 TOC 容器（固定在右侧）。- 
- 扫描 .content-inner 中的所有 h2。- 
- 为每个标题生成 id，构建带 data-target 的列表。- 
- 点击列表项 → 平滑滚动到对应标题。- 
- 滚动页面时，通过 IntersectionObserver 自动高亮当前在视口上部的标题。- 
- 如果内容区域发生变化（通过 MutationObserver），自动重建 TOC。- 
- 在屏幕宽度 ≤1024px 时，整个 TOC 被 CSS 隐藏。

这样实现的好处是：

- 自动：无需手动写目录结构，完全根据文章 h2 生成。- 
- 智能高亮：不仅滚动时高亮，点击跳转后也会刷新高亮。- 
- 性能优化：使用 IntersectionObserver 和延迟重建，避免频繁操作 DOM。- 
- 安全：转义标题文本，防止 XSS。- 
- 响应式：移动端自动隐藏，不影响阅读。