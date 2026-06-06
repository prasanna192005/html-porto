document.addEventListener('DOMContentLoaded', () => {
  // DevTools Easter Egg
  console.log(
    `%cprasanna %c| portfolio%c\n\nKeyboard Shortcuts:\n - [t] Toggle Theme\n - [e] Copy Email\n - [c] Copy NPX CLI\n - [g] Open GitHub\n - [l] Open LinkedIn\n - [p] Open prasanna19.xyz\n - [k] Play Game\n`,
    "font-weight: bold; font-size: 13px; color: #ea580c;",
    "font-size: 13px; color: #71717a;",
    "font-family: monospace; color: inherit;"
  );

  const toggleBtn = document.getElementById('theme-toggle');
  
  if (!toggleBtn) return;

  // Retrieve current applied theme state
  function getActiveTheme() {
    const attrTheme = document.documentElement.getAttribute('data-theme');
    return attrTheme || 'light';
  }

  // Update button text to show what theme you switch to
  function updateToggleText(theme) {
    toggleBtn.textContent = theme === 'dark' ? 'Light' : 'Dark';
    toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }

  // Initial state setup
  let currentTheme = getActiveTheme();
  updateToggleText(currentTheme);

  // Toggle theme click listener
  toggleBtn.addEventListener('click', () => {
    const active = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = active === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateToggleText(nextTheme);
    showToast(`Theme: ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  });

  // Dynamic Scroll Progress Bar
  const progressBar = document.createElement('div');
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '2px';
  progressBar.style.backgroundColor = 'var(--text)';
  progressBar.style.width = '0%';
  progressBar.style.zIndex = '9999';
  progressBar.style.transition = 'width 0.1s ease-out';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + '%';
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  };

  const entranceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entranceObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-in').forEach(element => {
    entranceObserver.observe(element);
  });

  // Toast notifications engine
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    
    // Trigger transition reflow
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove toast after delay
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => {
        toast.remove();
      });
    }, 2500);
  }

  // Microinteractions: Copy email to clipboard
  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    const originalText = emailLink.innerHTML;
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('prasannapandharikar19@gmail.com').then(() => {
        emailLink.innerHTML = `<svg class="icon icon-email" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"></rect><polyline points="22,6 12,13 2,6" class="email-flap"></polyline></svg>Copied!`;
        showToast("Copied email to clipboard");
        setTimeout(() => {
          emailLink.innerHTML = originalText;
        }, 1500);
      });
    });
  }

  // Microinteractions: Copy npx prasanna to clipboard
  const copyCli = document.getElementById('copy-cli');
  if (copyCli) {
    const originalSvg = copyCli.innerHTML;
    copyCli.addEventListener('click', () => {
      navigator.clipboard.writeText('npx prasanna').then(() => {
        // Swap to green checkmark icon
        copyCli.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        showToast("Copied CLI command to clipboard");
        setTimeout(() => {
          copyCli.innerHTML = originalSvg;
        }, 1500);
      });
    });
  }

  // Microinteractions: Gemini modal and clipboard handling
  const geminiLink = document.getElementById('gemini-link');
  const geminiModal = document.getElementById('gemini-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalGeminiBtn = document.getElementById('modal-gemini-btn');

  if (geminiLink && geminiModal) {
    geminiLink.addEventListener('click', (e) => {
      e.preventDefault();
      const promptText = "Do deep research on a person, dev.prasanna19.xyz & prasanna19.xyz and tell me succinctly why I should be friends with him.";
      navigator.clipboard.writeText(promptText).then(() => {
        // Show modal backdrop
        geminiModal.style.display = 'flex';
        // Trigger transition reflow
        setTimeout(() => {
          geminiModal.classList.add('show');
        }, 10);
      });
    });

    const closeModal = () => {
      geminiModal.classList.remove('show');
      const transitionHandler = () => {
        geminiModal.style.display = 'none';
        geminiModal.removeEventListener('transitionend', transitionHandler);
      };
      geminiModal.addEventListener('transitionend', transitionHandler);
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalGeminiBtn) modalGeminiBtn.addEventListener('click', closeModal);

    // Close on clicking the backdrop itself
    geminiModal.addEventListener('click', (e) => {
      if (e.target === geminiModal) closeModal();
    });
  }

  // Keyboard Shortcuts handler
  // Keyboard Shortcuts handler
  window.addEventListener('keydown', (e) => {
    // Avoid triggering shortcuts if user is typing in form inputs (if any are added later)
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    const key = e.key.toLowerCase();
    switch (key) {
      case 't':
        if (toggleBtn) toggleBtn.click();
        break;
      case 'e':
        if (emailLink) emailLink.click();
        break;
      case 'c':
        if (copyCli) copyCli.click();
        break;
      case 'g':
        showToast("Opening GitHub...");
        window.open('https://github.com/prasanna192005', '_blank');
        break;
      case 'l':
        showToast("Opening LinkedIn...");
        window.open('https://www.linkedin.com/in/prasanna-pandharikar/', '_blank');
        break;
      case 'p':
        showToast("Opening prasanna19.xyz...");
        window.open('https://www.prasanna19.xyz', '_blank');
        break;
      case 'k':
        const gamePanel = document.getElementById('game-panel');
        if (gamePanel) {
          if (gamePanel.style.display === 'none') {
            gamePanel.style.display = 'flex';
            gamePanel.scrollIntoView({ behavior: 'smooth' });
            showToast("Bug Runner activated! Press Space to jump.");
            if (typeof resetDinoGame === 'function') resetDinoGame();
          } else {
            gamePanel.style.display = 'none';
            if (typeof stopDinoGame === 'function') stopDinoGame();
          }
        }
        break;
    }
  });

  // Live IST Clock
  function updateClock() {
    const clockEl = document.getElementById('local-clock');
    if (!clockEl) return;
    
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeStr = now.toLocaleTimeString('en-US', options);
    clockEl.textContent = `${timeStr} IST`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Dino Game logic (Bug Runner) - Reused for Flappy Developer
  let resetDinoGame = null;
  let stopDinoGame = null;

  (function() {
    const gamePanel = document.getElementById('game-panel');
    const canvas = document.getElementById('game-canvas');
    const scoreVal = document.getElementById('current-score');
    const highScoreVal = document.getElementById('high-score');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let isPlaying = false;
    let score = 0;
    let highScore = localStorage.getItem('flappy-high-score') || 0;
    highScoreVal.textContent = highScore;

    // Physics constants
    const gravity = 0.25;
    const flapForce = -4.5;
    
    // Player
    const player = {
      x: 80,
      y: 60,
      vy: 0,
      width: 18,
      height: 14,
      draw(wingUp) {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#18181b';
        // Draw body (pixelated bird or ship)
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Eye
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#ffffff';
        ctx.fillRect(this.x + 11, this.y + 3, 3, 3);
        
        // Flapping Wing
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#71717a';
        if (wingUp) {
          ctx.fillRect(this.x + 3, this.y - 3, 5, 5);
        } else {
          ctx.fillRect(this.x + 3, this.y + 11, 5, 5);
        }
      }
    };

    const pipes = [];
    const pipeWidth = 25;
    const pipeGap = 65;
    let spawnTimer = 0;
    let gameSpeed = 2.5;
    let animationFrameId = null;
    let wingTimer = 0;
    let wingUp = false;

    function resetGame() {
      score = 0;
      scoreVal.textContent = '0';
      pipes.length = 0;
      player.y = 60;
      player.vy = 0;
      gameSpeed = 2.5;
      spawnTimer = 0;
      wingTimer = 0;
    }

    resetDinoGame = function() {
      isPlaying = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resetGame();
      drawStartScreen();
    };

    stopDinoGame = function() {
      isPlaying = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };

    function flap() {
      player.vy = flapForce;
      wingUp = !wingUp;
    }

    function spawnPipe() {
      const minHeight = 20;
      const maxHeight = 140 - pipeGap - minHeight;
      const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
      pipes.push({
        x: canvas.width,
        topHeight: topHeight,
        bottomY: topHeight + pipeGap,
        passed: false
      });
    }

    function gameLoop() {
      if (!isPlaying) return;

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Ground Line
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 140);
      ctx.lineTo(canvas.width, 140);
      ctx.stroke();

      // Player Physics
      player.vy += gravity;
      player.y += player.vy;

      // Wing animation
      wingTimer++;
      if (wingTimer > 12) {
        wingUp = !wingUp;
        wingTimer = 0;
      }

      // Check boundary collisions
      if (player.y < 0) {
        player.y = 0;
        player.vy = 0;
      }
      if (player.y + player.height > 140) {
        gameOver();
        return;
      }

      player.draw(wingUp);

      // Spawn pipes
      spawnTimer++;
      if (spawnTimer > 90) {
        spawnPipe();
        spawnTimer = 0;
      }

      // Move & Draw Pipes
      for (let i = pipes.length - 1; i >= 0; i--) {
        const pipe = pipes[i];
        pipe.x -= gameSpeed;

        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#71717a';
        ctx.font = '14px "SFMono-Regular", Consolas, Menlo, monospace';

        // Draw top pipe: column of opening curly braces
        let topY = pipe.topHeight - 6;
        while (topY > -15) {
          ctx.fillText('{', pipe.x + 8, topY);
          topY -= 15;
        }

        // Draw bottom pipe: column of closing curly braces
        let bottomY = pipe.bottomY + 12;
        while (bottomY < 155) {
          ctx.fillText('}', pipe.x + 8, bottomY);
          bottomY += 15;
        }

        // Collision detection
        const pLeft = player.x;
        const pRight = player.x + player.width;
        const pTop = player.y;
        const pBottom = player.y + player.height;

        const pipeLeft = pipe.x;
        const pipeRight = pipe.x + pipeWidth;

        if (pRight > pipeLeft + 2 && pLeft < pipeRight - 2) {
          if (pTop < pipe.topHeight || pBottom > pipe.bottomY) {
            gameOver();
            return;
          }
        }

        // Score tracker
        if (!pipe.passed && pipeRight < player.x) {
          pipe.passed = true;
          score += 1;
          scoreVal.textContent = score;
          // Increase speed slightly
          if (score % 5 === 0) {
            gameSpeed += 0.2;
          }
        }

        // Remove offscreen pipes
        if (pipe.x + pipeWidth < 0) {
          pipes.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    }

    function gameOver() {
      isPlaying = false;
      showToast(`Game Over! Score: ${score}`);
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('flappy-high-score', highScore);
        highScoreVal.textContent = highScore;
        showToast("New High Score!");
      }
      drawStartScreen("GAME OVER. Press Space to restart.");
    }

    function drawStartScreen(msg = "Press Space or Click to Flap") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw ground
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 140);
      ctx.lineTo(canvas.width, 140);
      ctx.stroke();

      // Draw player sitting
      player.draw(false);

      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#71717a';
      ctx.font = '13px "SFMono-Regular", Consolas, Menlo, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(msg, canvas.width / 2, 70);
      ctx.textAlign = 'start'; // restore default
    }

    // Controls
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && gamePanel.style.display !== 'none') {
        e.preventDefault();
        
        if (!isPlaying) {
          resetGame();
          isPlaying = true;
          animationFrameId = requestAnimationFrame(gameLoop);
        }
        flap();
      }
    });

    canvas.addEventListener('click', () => {
      if (!isPlaying) {
        resetGame();
        isPlaying = true;
        animationFrameId = requestAnimationFrame(gameLoop);
      }
      flap();
    });

    drawStartScreen();
  })();
});
