const header = document.querySelector('[data-header]');
const modal = document.querySelector('[data-modal]');
const modalImage = document.querySelector('[data-modal-image]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalClose = document.querySelector('[data-modal-close]');
let lastTrigger = null;
const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 8);
onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
if ('IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {entry.target.classList.add('visible'); observer.unobserve(entry.target);}
 }), {threshold:0.05});
 document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
function openPreview(button) {
 const src = button.dataset.preview; if (!src || !modal || !modalImage || !modalTitle) return;
 if (typeof modal.showModal !== 'function') {window.open(src, '_blank', 'noopener'); return;}
 lastTrigger = button;
 modalImage.src = src; modalImage.alt = button.dataset.previewTitle || 'Project preview';
 modalTitle.textContent = modalImage.alt; modal.showModal(); document.documentElement.style.overflow = 'hidden';
}
document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => openPreview(button)));
modalClose?.addEventListener('click', () => modal.close());
modal?.addEventListener('click', event => {
 const rect = modal.getBoundingClientRect();
 if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close();
});
modal?.addEventListener('close', () => {document.documentElement.style.overflow = ''; modalImage.removeAttribute('src'); lastTrigger?.focus();});
