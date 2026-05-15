/**
 * 图片懒加载
 * 使用方法：在页面底部引入本文件，确保 DOM 中已有文章容器
 */
(function () {
  'use strict';

  // ========== 配置 ==========
  const CONTENT_SELECTOR = '.content-inner'; // 你的文章容器选择器
  const IMAGE_SELECTOR = 'img';
  const PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // 1px透明GIF

  let observer;

  // ========== 1. 初始化：src → data-src，用占位符 ==========
  function initImages() {
    const container = document.querySelector(CONTENT_SELECTOR);
    if (!container) return;

    const images = container.querySelectorAll(IMAGE_SELECTOR);
    images.forEach(img => {
      if (img.dataset.src) return;

      const originalSrc = img.getAttribute('src');
      if (!originalSrc || originalSrc.startsWith('data:')) return;

      img.dataset.src = originalSrc;
      img.src = PLACEHOLDER;
      if (img.width) img.style.aspectRatio = img.width / img.height;
    });
  }

  // ========== 2. 懒加载观察器 ==========
  function setupLazyLoading() {
    if (!('IntersectionObserver' in window)) {
      loadAllImagesFallback();
      return;
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          loadImage(img);
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px', // 提前200px加载
      threshold: 0.01
    });

    const container = document.querySelector(CONTENT_SELECTOR);
    if (!container) return;
    const images = container.querySelectorAll(`${IMAGE_SELECTOR}[data-src]`);
    images.forEach(img => observer.observe(img));
  }

  function loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    const tempImage = new Image();
    tempImage.onload = () => {
      img.src = src;
      img.removeAttribute('data-src');
      img.style.opacity = '1';
    };
    tempImage.onerror = () => {
      img.removeAttribute('data-src');
    };
    tempImage.src = src;
  }

  function loadAllImagesFallback() {
    const container = document.querySelector(CONTENT_SELECTOR);
    if (!container) return;
    const images = container.querySelectorAll(`${IMAGE_SELECTOR}[data-src]`);
    images.forEach(img => loadImage(img));
  }

  // ========== 3. 启动 ==========
  function init() {
    initImages();
    setupLazyLoading();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();