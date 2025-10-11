window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  document.querySelectorAll('[data-field]').forEach(el => {
    const key = el.getAttribute('data-field');
    const value = params.get(key);
    if (!value) return;
    const decoded = decodeURIComponent(value);

    if (key === 'image') {
      el.innerHTML = decoded;   // insert the <img> tag HTML directly
    } else if (el.tagName === 'IMG' || el.tagName === 'IMAGE') {
      el.setAttribute('href', decoded);
      el.src = decoded;
    } else {
      el.textContent = decoded;
    }
  });
});
