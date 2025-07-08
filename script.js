document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.getElementById('preloader');
  const mainContent = document.querySelector('.bio-card');

  if (mainContent) mainContent.style.display = 'none';

  setTimeout(() => {
    if (preloader) preloader.classList.add('hide');
    if (mainContent) mainContent.style.display = '';
    setTimeout(() => {
      if (preloader) preloader.style.display = 'none';
    }, 700);
  }, 1500);

  // Копирование Discord
  const discordBtn = document.querySelector('.discord-btn');
  const toast = document.getElementById('copy-toast');
  if (discordBtn && toast) {
    discordBtn.addEventListener('click', function() {
      navigator.clipboard.writeText('nezem1337').then(() => {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 1500);
      });
    });
  }

  // Анимация трёх точек
  const dots = document.querySelector('.preloader-dots');
  if (dots) {
    let i = 0;
    setInterval(() => {
      dots.textContent = '.'.repeat((i++ % 3) + 1);
    }, 400);
  }

  const audio = document.getElementById('bg-music');
  const volumeSlider = document.getElementById('volume-slider');
  if (audio && volumeSlider) {
    audio.volume = volumeSlider.value;
    volumeSlider.addEventListener('input', function() {
      audio.volume = this.value;
    });
    // Попытка автозапуска с повтором
    function tryPlay() {
      audio.play().catch(() => {
        setTimeout(tryPlay, 2000);
      });
    }
    tryPlay();
  }

  // Кнопка паузы
  const pauseBtn = document.getElementById('pause-btn');
  const pauseIcon = document.getElementById('pause-icon');
  function setPauseIcon(isPaused) {
    if (!pauseIcon) return;
    if (isPaused) {
      pauseIcon.innerHTML = '<polygon points="8,5 19,12 8,19" />'; // play
    } else {
      pauseIcon.innerHTML = '<rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/>';
    }
  }
  if (audio && pauseBtn && pauseIcon) {
    pauseBtn.addEventListener('click', function() {
      if (audio.paused) {
        audio.play();
        setPauseIcon(false);
      } else {
        audio.pause();
        setPauseIcon(true);
      }
    });
    audio.addEventListener('play', function() {
      setPauseIcon(false);
    });
    audio.addEventListener('pause', function() {
      setPauseIcon(true);
    });
    setPauseIcon(audio.paused);
  }
});
