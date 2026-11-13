const progress = document.getElementById('scrollProgress');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function updateProgress(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
}));

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
},{threshold:0.12, rootMargin:'0px 0px -35px 0px'});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const roles = ['Developer','Problem Solver','AI/ML Enthusiast'];
let roleIndex = 0;
const roleEl = document.getElementById('rotatingRole');
setInterval(() => {
  roleEl.style.opacity = '0';
  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleEl.textContent = roles[roleIndex];
    roleEl.style.opacity = '1';
  },250);
},2400);
roleEl.style.transition = 'opacity .25s ease';

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target, target = Number(el.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 22));
      const timer = setInterval(() => {
        current = Math.min(target, current + step);
        el.textContent = current + '+';
        if(current >= target) clearInterval(timer);
      },55);
      countObserver.unobserve(el);
    }
  });
},{threshold:.7});
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();
