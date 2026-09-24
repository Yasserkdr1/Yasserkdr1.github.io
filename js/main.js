const header = document.querySelector('[data-header]');
const modal = document.querySelector('[data-modal]');
const modalImage = document.querySelector('[data-modal-image]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalClose = document.querySelector('[data-modal-close]');

const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.11, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

function openArchitecture(card) {
  const src = card.dataset.architecture;
  if (!src || !modal || !modalImage) return;
  modalImage.src = src;
  modalImage.alt = card.dataset.architectureTitle || 'Project architecture';
  modalTitle.textContent = card.dataset.architectureTitle || 'Project architecture';
  modal.showModal();
  document.documentElement.style.overflow = 'hidden';
}

function closeArchitecture() {
  if (!modal?.open) return;
  modal.close();
  modalImage.src = '';
  document.documentElement.style.overflow = '';
}

document.querySelectorAll('[data-project]').forEach((card) => {
  const button = card.querySelector('.architecture-button');
  button?.addEventListener('click', () => openArchitecture(card));
});

modalClose?.addEventListener('click', closeArchitecture);
modal?.addEventListener('click', (event) => {
  const rect = modal.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) closeArchitecture();
});
modal?.addEventListener('close', () => {
  document.documentElement.style.overflow = '';
});
