// ============================================================
// script.js — Md Anik Reza Portfolio
// ============================================================

// ========== CV DOWNLOAD ==========
function downloadCV() {
  if (typeof CV_BASE64 !== 'undefined') {
    const link = document.createElement('a');
    link.href = CV_BASE64;
    link.download = 'Md_Anik_Reza_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('CV file not found. Please contact: anikreza007@gmail.com');
  }
}

// ========== LOADER ==========
window.addEventListener('load', () => {
  const profileEl = document.getElementById('profilePhoto');
  const ph = document.getElementById('profilePlaceholder');
  
  if (profileEl) {
    if (typeof PROFILE_IMG !== 'undefined') {
      profileEl.src = PROFILE_IMG;
    }
    
    profileEl.onload = () => {
      profileEl.style.display = 'block';
      if (ph) ph.style.display = 'none';
    };

    profileEl.onerror = () => {
      profileEl.style.display = 'none';
      if (ph) ph.style.display = 'flex';
    };
  }

  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// ========== THEME TOGGLE ==========
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

document.getElementById('themeBtn').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ========== CUSTOM CURSOR ==========
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx + 'px';
  trail.style.top = ty + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('a, button, [onclick]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    trail.style.opacity = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    trail.style.opacity = '0.5';
  });
});

// ========== SCROLL PROGRESS BAR ==========
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scroll-progress').style.width = pct + '%';

  // Scroll to top button visibility
  const btn = document.getElementById('scrolltop');
  btn.classList.toggle('visible', window.scrollY > 400);
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== MOBILE NAVBAR ==========
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}
function closeNav() {
  document.getElementById('navLinks').classList.remove('open');
}

// ========== TYPEWRITER ANIMATION ==========
const titles = [
  'Software Quality Assurance (SQA)',
  'Software Support Engineer',
  'Photographer'
  // 'Python Developer',
  // 'Django Developer',
];
let ti = 0, ci = 0, deleting = false;

function type() {
  const txt = document.getElementById('typedText');
  const word = titles[ti];

  if (!deleting) {
    txt.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      return setTimeout(type, 1800);
    }
  } else {
    txt.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ti = (ti + 1) % titles.length;
      return setTimeout(type, 300);
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ========== PARTICLES CANVAS ==========
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function Particle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.r = Math.random() * 1.5 + 0.3;
  this.vx = (Math.random() - 0.5) * 0.4;
  this.vy = (Math.random() - 0.5) * 0.4;
  this.alpha = Math.random() * 0.5 + 0.1;
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const theme = document.documentElement.getAttribute('data-theme');
  const color = theme === 'dark' ? '255,255,255' : '79,70,229';

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color},${p.alpha})`;
    ctx.fill();
  });

  // Draw connecting lines
  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach(b => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${color},${0.06 * (1 - d / 120)})`;
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

// ========== SCROLL REVEAL (IntersectionObserver) ==========
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');

      // Animate skill bars
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });

      // Animate stat counters
      e.target.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let start = 0;
        const step = () => {
          start += Math.ceil(target / 40);
          if (start >= target) { el.textContent = target + suffix; return; }
          el.textContent = start + suffix;
          setTimeout(step, 40);
        };
        step();
      });

      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ========== PROJECT FILTER ==========
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const tags = card.dataset.tags || '';
      card.style.display = (filter === 'all' || tags.includes(filter)) ? 'block' : 'none';
    });
  });
});

// ========== CONTACT FORM VALIDATION ==========
function submitForm() {
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const subject = document.getElementById('cSubject').value.trim();
  const msg = document.getElementById('cMsg').value.trim();
  const msgEl = document.getElementById('formMsg');

  if (!name || !email || !subject || !msg) {
    msgEl.textContent = '⚠️ Please fill in all fields before sending.';
    msgEl.className = 'form-msg error';
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    msgEl.textContent = '⚠️ Please enter a valid email address.';
    msgEl.className = 'form-msg error';
    return;
  }

  msgEl.textContent = "✅ Message sent! I'll get back to you shortly.";
  msgEl.className = 'form-msg success';

  // Clear fields
  document.getElementById('cName').value = '';
  document.getElementById('cEmail').value = '';
  document.getElementById('cSubject').value = '';
  document.getElementById('cMsg').value = '';

  setTimeout(() => { msgEl.className = 'form-msg'; }, 5000);
}
