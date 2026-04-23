const cursor = document.querySelector('.cursor');
const glow = document.querySelector('.cursor-glow');
const cards = document.querySelectorAll('.reveal');
const tiltCard = document.querySelector('.tilt-card');

let mx = innerWidth / 2, my = innerHeight / 2;
let x = mx, y = my, gx = mx, gy = my;

addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animate() {
  x += (mx - x) * 0.22;
  y += (my - y) * 0.22;
  gx += (mx - gx) * 0.08;
  gy += (my - gy) * 0.08;

  if (cursor) {
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
  }

  if (glow) {
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';
  }

  if (tiltCard) {
    const r = tiltCard.getBoundingClientRect();
    const dx = (mx - (r.left + r.width / 2)) / r.width;
    const dy = (my - (r.top + r.height / 2)) / r.height;
    tiltCard.style.transform = `rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg)`;
  }

  requestAnimationFrame(animate);
}
animate();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });

cards.forEach(card => observer.observe(card));
