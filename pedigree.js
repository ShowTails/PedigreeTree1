
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  document.querySelectorAll('[data-field]').forEach(el => {
    const field = el.getAttribute('data-field');
    const value = params.get(key);
    if (value) {
      if (el.tagName === 'IMG') el.src = decodeURIComponent(value);
      else el.textContent = decodeURIComponent(value);
    }
  });
});
