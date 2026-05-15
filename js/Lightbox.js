// 图片点击放大 - 终极稳定版 v4（处理 body 未就绪）
(function () {
  // ===== 核心逻辑 =====
  function bootstrap() {
    // ===== 1. 注入弹窗 DOM =====
    if (!document.getElementById('img-lightbox')) {
      const lb = document.createElement('div');
      lb.id = 'img-lightbox';
      lb.innerHTML = '<img src="" alt="" draggable="false">';
      document.body.appendChild(lb);
    }
    const lightbox = document.getElementById('img-lightbox');
    const lbImg = lightbox.querySelector('img');
    

    // ===== 2. 弹窗关闭 =====
    const close = () => lightbox.classList.remove('active');
    lightbox.addEventListener('click', close);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });

    // ===== 3. 全局禁止图片拖拽（捕获阶段）=====
    document.addEventListener('dragstart', e => {
      if (e.target.tagName === 'IMG' || e.target.closest('img')) {
        e.preventDefault();
      }
    }, true);

    // ===== 4. 注入全局样式 =====
    if (!document.getElementById('lb-no-drag-style')) {
      const style = document.createElement('style');
      style.id = 'lb-no-drag-style';
      style.textContent = `
        img {
          -webkit-user-drag: none !important;
          -webkit-user-select: none !important;
          user-select: none !important;
        }
        .content-inner img,
        .markdown-body img,
        article img,
        main img {
          cursor: zoom-in !important;
        }
        #img-lightbox img {
          cursor: zoom-out !important;
        }
      `;
      document.head.appendChild(style);
    }

    // ===== 5. 事件委托：document 级 click 拦截 =====
    document.addEventListener('click', e => {
      const img = e.target.closest('img');
      if (!img) return;
      if (img.closest('#img-lightbox')) return;
      if (!img.closest('.content-inner, .markdown-body, article, main')) return;

      e.preventDefault();
      e.stopPropagation();

      const src = img.dataset.full || img.getAttribute('src') || img.currentSrc;
      if (!src) return;

      lbImg.src = src;
      lbImg.alt = img.getAttribute('alt') || '';
      lightbox.classList.add('active');
    });

    // ===== 6. 标记已有图片 =====
    function markImage(img) {
      img.setAttribute('draggable', 'false');
      img.draggable = false;
    }
    document.querySelectorAll('img').forEach(markImage);

    // ===== 7. 监听新增图片 =====
    new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.tagName === 'IMG') markImage(node);
            if (node.querySelectorAll) {
              node.querySelectorAll('img').forEach(markImage);
            }
          }
        });
      });
    }).observe(document.body, { childList: true, subtree: true });

    console.log('✅ 图片点击放大 v4 已启动');
  }

  // ===== 入口：确保 body 存在后再跑 =====
  if (document.body) {
    bootstrap();
  } else {
    // body 不存在，等 DOM 构建完
    document.addEventListener('DOMContentLoaded', bootstrap);
  }
})();