function addCopyButtons() {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    const originalText = link.textContent;
    link.classList.add('copy-btn');
    link.addEventListener('click', function(e) {
      if (this.href.startsWith('mailto:')) {
        const email = this.href.substring(7);
        navigator.clipboard.writeText(email).then(() => {
          const originalText = this.textContent;
          this.textContent = '✓ Copied';
          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        });
      }
    });
  });
}

function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.timeline-item, .project-card, .skill-box').forEach(el => {
    observer.observe(el);
  });
}

function validateForm() {
  const form = document.querySelector('form.inline-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      const inputs = this.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'rgba(255, 100, 100, 0.5)';
          input.style.background = 'rgba(255, 0, 0, 0.05)';
        } else {
          input.style.borderColor = 'rgba(255,255,255,0.1)';
          input.style.background = 'rgba(255,255,255,0.03)';
        }
      });
      if (!isValid) {
        e.preventDefault();
        console.warn('Please fill in all required fields');
      }
    });
  }
}

function addMouseTrackingEffect() {
  const cards = document.querySelectorAll('.card, .project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      
      this.style.setProperty('--mouse-x', xPercent + '%');
      this.style.setProperty('--mouse-y', yPercent + '%');
    });

    card.addEventListener('mouseleave', function() {
      this.style.setProperty('--mouse-x', '50%');
      this.style.setProperty('--mouse-y', '50%');
    });
  });
}

function addParallaxEffect() {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('header.hero');
        if (hero) {
          hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

function addHoverStaggerEffect() {
  const chipElements = document.querySelectorAll('.chip');
  const skillBoxes = document.querySelectorAll('.skill-box');
  const allInteractive = [...chipElements, ...skillBoxes];
  
  allInteractive.forEach((el, index) => {
    el.style.transitionDelay = (index * 0.05) + 's';
  });
}

function addThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle');
  const htmlElement = document.documentElement;
  
  if (toggleBtn) {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      toggleBtn.textContent = '🌙';
    }

    toggleBtn.addEventListener('click', () => {
      const isLightMode = document.body.classList.toggle('light-mode');
      const newTheme = isLightMode ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      toggleBtn.textContent = isLightMode ? '🌙' : '☀️';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  addCopyButtons();
  addScrollAnimations();
  validateForm();
  addMouseTrackingEffect();
  addThemeToggle();
  addParallaxEffect();
  addHoverStaggerEffect();
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    e.preventDefault();
    window.print();
  }
});
