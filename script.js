document.addEventListener('DOMContentLoaded', () => {
  // DevTools Easter Egg
  console.log(
    `%cprasanna %c| portfolio%c\n\nKeyboard Shortcuts:\n - [t] Toggle Theme\n - [e] Copy Email\n - [c] Copy NPX CLI\n - [g] Open GitHub\n - [l] Open LinkedIn\n - [p] Open prasanna19.xyz\n`,
    "font-weight: bold; font-size: 13px; color: #ea580c;",
    "font-size: 13px; color: #71717a;",
    "font-family: monospace; color: inherit;"
  );

  const toggleBtn = document.getElementById('theme-toggle');
  
  if (!toggleBtn) return;

  // Retrieve current applied theme state
  function getActiveTheme() {
    const attrTheme = document.documentElement.getAttribute('data-theme');
    if (attrTheme) return attrTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
    const active = document.documentElement.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const nextTheme = active === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateToggleText(nextTheme);
    showToast(`Theme: ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  });

  // Keep preference matching system if user has not explicitly clicked it
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const nextTheme = e.matches ? 'dark' : 'light';
      updateToggleText(nextTheme);
    }
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
});
