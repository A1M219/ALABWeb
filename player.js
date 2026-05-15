// ====================================
// 音乐播放器逻辑（加固版 + 进度条）
// ====================================

(function () {
  // ========== 歌单配置 ==========
  const playlist = [
    { title: '冬の花', artist: '宫本浩次', src: '/assets/audio/dongzhihua.mp3' },
    { title: '普通Disco', artist: '汪峰', src: '/assets/audio/Disco.mp3' },
    { title: '天下',   artist: '张杰', src: '/assets/audio/tianxia.mp3' },
    { title: '童话镇', artist: '陈雪凝', src: '/assets/audio/tonghuazhen.mp3' }
  ];

  // ========== 格式化时间 (秒 → mm:ss) ==========
  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // ========== 等待 DOM 就绪 ==========
  function whenReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  whenReady(function () {
    // ========== DOM 元素 ==========
    const audio         = document.getElementById('audioElement');
    const playBtn       = document.getElementById('playBtn');
    const prevBtn       = document.getElementById('prevBtn');
    const nextBtn       = document.getElementById('nextBtn');
    const volumeSlider  = document.getElementById('volumeSlider');
    const playerTitle   = document.getElementById('playerTitle');
    const playerArtist  = document.getElementById('playerArtist');
    const playerToggle  = document.getElementById('playerToggle');
    const playerBody    = document.getElementById('playerBody');

    // ---------- 新增：进度条相关 ----------
    const progressBar   = document.getElementById('progressBar');
    const timeCurrent   = document.getElementById('timeCurrent');
    const timeDuration  = document.getElementById('timeDuration');

    // ========== 元素缺失检查 ==========
    const required = {
      audio, playBtn, prevBtn, nextBtn, volumeSlider,
      playerTitle, playerArtist, playerToggle, playerBody,
      progressBar, timeCurrent, timeDuration
    };
    const missing = Object.entries(required)
      .filter(([, el]) => el === null)
      .map(([name]) => name);

    if (missing.length > 0) {
      console.warn('⚠️ 播放器初始化失败，缺少 DOM 元素:', missing.join(', '));
      return;
    }

    // ========== 状态 ==========
    let currentIndex  = 0;
    let isPlaying     = false;
    let isSeeking     = false;   // 是否正在拖拽进度条

    // ========== 加载曲目 ==========
    function loadTrack(index) {
      if (index < 0 || index >= playlist.length) return;
      currentIndex = index;
      const track = playlist[currentIndex];
      audio.src = track.src;
      playerTitle.textContent = track.title;
      playerArtist.textContent = track.artist;

      // 重置进度条
      progressBar.value = 0;
      timeCurrent.textContent = '00:00';
      timeDuration.textContent = '00:00';
    }

    // ========== 播放 / 暂停 ==========
    function togglePlay() {
      if (playlist.length === 0) return;
      if (isPlaying) {
        audio.pause();
      } else {
        if (!audio.src || audio.src === window.location.href) {
          loadTrack(currentIndex);
        }
        audio.play().catch(err => {
          console.warn('播放失败:', err.message);
        });
      }
    }

    // ========== 上一首 ==========
    function prevTrack() {
      if (playlist.length === 0) return;
      const newIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      loadTrack(newIndex);
      if (isPlaying) audio.play().catch(() => {});
    }

    // ========== 下一首 ==========
    function nextTrack() {
      if (playlist.length === 0) return;
      const newIndex = (currentIndex + 1) % playlist.length;
      loadTrack(newIndex);
      if (isPlaying) audio.play().catch(() => {});
    }

    // ========== 进度条更新 ==========
    function updateProgress() {
      if (isSeeking) return;   // 拖拽时不更新，避免"拉回"
      if (!isFinite(audio.duration)) return;

      const percent = (audio.currentTime / audio.duration) * 100;
      progressBar.value = percent;
      timeCurrent.textContent = formatTime(audio.currentTime);
    }

    // ========== 进度条跳转 ==========
    function seekAudio(e) {
      isSeeking = true;
      if (isFinite(audio.duration)) {
        const percent = parseFloat(progressBar.value);
        const newTime = (percent / 100) * audio.duration;
        audio.currentTime = newTime;
        timeCurrent.textContent = formatTime(newTime);
      }
    }

    function seekEnd() {
      isSeeking = false;
    }

    // ========== 事件绑定 ==========
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);

    volumeSlider.addEventListener('input', function () {
      audio.volume = this.value / 100;
    });

    // 进度条事件
    progressBar.addEventListener('mousedown', () => { isSeeking = true; });
    progressBar.addEventListener('input', seekAudio);
    progressBar.addEventListener('change', seekEnd);
    progressBar.addEventListener('mouseup', seekEnd);
    // 触摸设备支持
    progressBar.addEventListener('touchstart', () => { isSeeking = true; });
    progressBar.addEventListener('touchend', seekEnd);

    // 音频事件
    audio.addEventListener('loadedmetadata', () => {
      timeDuration.textContent = formatTime(audio.duration);
      progressBar.value = 0;
    });

    audio.addEventListener('timeupdate', updateProgress);

    audio.addEventListener('play', () => {
      isPlaying = true;
      playBtn.textContent = '⏸';
    });

    audio.addEventListener('pause', () => {
      isPlaying = false;
      playBtn.textContent = '▶';
    });

    audio.addEventListener('ended', () => {
      // 歌曲结束时把进度条拉到 100%
      progressBar.value = 100;
      timeCurrent.textContent = timeDuration.textContent;
      nextTrack();
    });

    audio.addEventListener('error', () => {
      console.warn('音频加载失败:', audio.src);
      playerTitle.textContent = '加载失败';
      playerArtist.textContent = '请检查文件路径';
    });

    // 播放器折叠
    playerToggle.addEventListener('click', () => {
      playerBody.classList.toggle('hidden');
    });

    // ========== 初始化 ==========
    playBtn.textContent = '▶';
    if (playlist.length === 0) {
      playerTitle.textContent = '歌单为空';
    } else {
      audio.volume = volumeSlider.value / 100;
      loadTrack(currentIndex);
    }

    console.log('✅ 播放器初始化成功（含进度条），歌单共', playlist.length, '首');
  });
})();