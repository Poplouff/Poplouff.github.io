// Galeries de projets : navigation au clic et au clavier, sans dépendance.
document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const track = gallery.querySelector('.gallery-track');
  const images = [...track.querySelectorAll('img')];
  const count = gallery.querySelector('[data-count]');
  let index = 0;

  function show(nextIndex) {
    index = (nextIndex + images.length) % images.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    count.textContent = `${index + 1} / ${images.length}`;
  }

  gallery.querySelector('[data-prev]').addEventListener('click', () => show(index - 1));
  gallery.querySelector('[data-next]').addEventListener('click', () => show(index + 1));

  // Les images peuvent également défiler au doigt sur mobile.
  let startX = null;
  gallery.addEventListener('touchstart', (event) => {
    startX = event.changedTouches[0].clientX;
  }, { passive: true });
  gallery.addEventListener('touchend', (event) => {
    if (startX === null) return;
    const dx = event.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });

  show(0);
});
