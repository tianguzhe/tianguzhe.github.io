const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const toggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
const label = toggle?.querySelector('[data-motion-label]');
const animations = new Set<Animation>();
let userPaused = false;

try {
  userPaused = localStorage.getItem('tian-motion') === 'off';
} catch { /* The page also works when storage is unavailable. */ }

function motionEnabled() {
  return !reduceMotion.matches && !userPaused;
}

function syncMotion() {
  const enabled = motionEnabled();
  root.dataset.motion = enabled ? 'on' : 'off';
  if (toggle) {
    toggle.hidden = false;
    toggle.disabled = reduceMotion.matches;
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.title = reduceMotion.matches ? '已遵循系统的减少动态效果设置' : '开启或暂停页面动效';
  }
  if (label) label.textContent = reduceMotion.matches ? '系统已减少动效' : `动效：${enabled ? '开' : '关'}`;
  if (!enabled) {
    animations.forEach((animation) => animation.cancel());
    animations.clear();
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((surface) => {
      surface.style.removeProperty('--tilt-x');
      surface.style.removeProperty('--tilt-y');
    });
  }
}

toggle?.addEventListener('click', () => {
  userPaused = !userPaused;
  try { localStorage.setItem('tian-motion', userPaused ? 'off' : 'on'); } catch { /* Optional preference. */ }
  syncMotion();
});
reduceMotion.addEventListener('change', syncMotion);
syncMotion();

// Elements remain readable without JavaScript or if an animation cannot run.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      observer.unobserve(target);
      if (!motionEnabled() || typeof target.animate !== 'function') return;
      const delay = Math.min(Number((target as HTMLElement).dataset.revealDelay) || 0, 220);
      const animation = target.animate(
        [{ opacity: 0, translate: '0 24px' }, { opacity: 1, translate: '0 0' }],
        { duration: 720, delay, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' },
      );
      animations.add(animation);
      animation.addEventListener('finish', () => animations.delete(animation), { once: true });
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  document.querySelectorAll('[data-reveal]').forEach((target) => observer.observe(target));
}

document.querySelectorAll<HTMLElement>('[data-spotlight], [data-tilt]').forEach((surface) => {
  let frame = 0;
  surface.addEventListener('pointermove', (event) => {
    if (!motionEnabled() || !finePointer.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      if (!motionEnabled()) return;
      const rect = surface.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      surface.style.setProperty('--pointer-x', `${x}px`);
      surface.style.setProperty('--pointer-y', `${y}px`);
      if (surface.hasAttribute('data-tilt')) {
        surface.style.setProperty('--tilt-x', `${(0.5 - y / rect.height) * 4}deg`);
        surface.style.setProperty('--tilt-y', `${(x / rect.width - 0.5) * 4}deg`);
      }
    });
  }, { passive: true });
  surface.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    surface.style.removeProperty('--tilt-x');
    surface.style.removeProperty('--tilt-y');
  });
});

function syncVisibility() {
  root.dataset.motionPaused = String(document.hidden);
  animations.forEach((animation) => {
    if (document.hidden) animation.pause();
    else if (motionEnabled()) animation.play();
  });
}
document.addEventListener('visibilitychange', syncVisibility);
syncVisibility();

const header = document.querySelector('.site-header');
let scrollFrame = 0;
function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
  scrollFrame = 0;
}
window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateHeader);
}, { passive: true });
updateHeader();

const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menu.open = false; }));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.open) {
    menu.open = false;
    menu.querySelector('summary')?.focus();
  }
});
document.addEventListener('click', (event) => {
  if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
});

const dialog = document.querySelector<HTMLDialogElement>('.image-dialog');
if (dialog && typeof dialog.showModal === 'function') {
  document.querySelectorAll<HTMLAnchorElement>('[data-preview]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (!dialog.open) dialog.showModal();
    });
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
}
