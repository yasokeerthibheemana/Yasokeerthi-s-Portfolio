// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Typed roles
const roles = ['AI & Software Developer', 'Computer Science Undergraduate', 'Generative AI Enthusiast'];
const typedEl = document.querySelector('.typed');
let ri = 0, ci = 0, deleting = false;
function type() {
  const cur = roles[ri];
  typedEl.textContent = cur.slice(0, ci);
  if (!deleting && ci < cur.length) { ci++; setTimeout(type, 70); }
  else if (deleting && ci > 0) { ci--; setTimeout(type, 40); }
  else {
    deleting = !deleting;
    if (!deleting) ri = (ri + 1) % roles.length;
    setTimeout(type, deleting ? 1400 : 300);
  }
}
type();

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Counters
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const t = setInterval(() => {
      n += step;
      if (n >= target) { n = target; clearInterval(t); }
      el.textContent = n + '+';
    }, 40);
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => cio.observe(c));

// EmailJS
const EMAILJS_SERVICE_ID = 'service_g7ojrbs';
const EMAILJS_TEMPLATE_ID = 'template_4dn2mrf';
const EMAILJS_PUBLIC_KEY = 'APSzuOKyKU4hFL3Ri';
const CONTACT_EMAIL = 'bheemanayasokeerthi@gmail.com';
if (window.emailjs) emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

function buildMailto({ name, email, subject, message }) {
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function showMailFallback(status, params) {
  status.style.color = '#ff6b6b';
  status.textContent = 'Unable to send right now. ';
  const link = document.createElement('a');
  link.href = buildMailto(params);
  link.textContent = 'Send by email instead.';
  link.style.color = '#22d3ee';
  link.style.fontWeight = '700';
  status.appendChild(link);
}

function showEmailJsError(status, params, errorText) {
  status.style.color = '#ff6b6b';
  status.textContent = '';

  const message = document.createElement('span');
  const lowerError = String(errorText || '').toLowerCase();
  if (lowerError.includes('template id not found') || lowerError.includes('template id is invalid')) {
    message.textContent = 'EmailJS setup error: the Template ID is not found. Please check the Template ID in your EmailJS dashboard. ';
  } else if (lowerError.includes('service')) {
    message.textContent = 'EmailJS setup error: the Service ID is not valid. Please check the Service ID in your EmailJS dashboard. ';
  } else if (lowerError.includes('public key') || lowerError.includes('user id')) {
    message.textContent = 'EmailJS setup error: the Public Key is not valid. Please check the Public Key in your EmailJS dashboard. ';
  } else {
    message.textContent = 'Unable to send right now. ';
  }
  status.appendChild(message);

  const link = document.createElement('a');
  link.href = buildMailto(params);
  link.textContent = 'Send by email instead.';
  link.style.color = '#22d3ee';
  link.style.fontWeight = '700';
  status.appendChild(link);
}

// Contact form
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('form-status');
  const btn = form.querySelector('button[type="submit"]');
  const data = new FormData(form);
  const params = {
    name: data.get('name'),
    from_name: data.get('name'),
    email: data.get('email'),
    from_email: data.get('email'),
    reply_to: data.get('email'),
    subject: data.get('subject'),
    message: data.get('message'),
    title: data.get('subject'),
    to_email: CONTACT_EMAIL,
    to_name: 'Yasokeerthi Bheemana',
  };
  status.style.color = '';
  status.textContent = 'Sending...';
  btn.disabled = true;
  try {
    if (!window.emailjs) throw new Error('EmailJS library did not load');
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params, { publicKey: EMAILJS_PUBLIC_KEY });
    status.textContent = '✅ Message sent! I will get back to you soon.';
    form.reset();
  } catch (err) {
    const errorText = err?.text || err?.message || err;
    console.error('EmailJS error', errorText);
    showEmailJsError(status, params, errorText);
  } finally {
    btn.disabled = false;
  }
});


// AI Network background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  const count = Math.min(90, Math.floor((W * H) / 18000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.6 + 0.6,
  }));
}
resize();
window.addEventListener('resize', resize);
function draw() {
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(34,211,238,0.65)';
    ctx.fill();
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(59,130,246,${0.15 * (1 - d / 130)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();

// Nav scroll effect
window.addEventListener('scroll', () => {
  document.querySelector('.nav').style.background =
    window.scrollY > 50 ? 'rgba(7,8,13,0.85)' : 'rgba(7,8,13,0.55)';
});

// Force resume PDF download via blob (bypass inline viewers)
document.getElementById('resumeBtn')?.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('/YasokeerthiBheemana_Resume.pdf');
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'YasokeerthiBheemana_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (err) {
    window.location.href = '/YasokeerthiBheemana_Resume.pdf';
  }
});
