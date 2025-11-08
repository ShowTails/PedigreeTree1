// ShowTails Pedigree Builder JS
// Supports: data-field, data-chain (space separated), <img> + SVG <image>

window.addEventListener('DOMContentLoaded', () => {
  // Decode URL param, then decode any HTML entities, return a plain string.
  function getParam(name) {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get(name) || '';

    // 1) URL-decode (handle + as space too)
    const urlDecoded = decodeURIComponent(raw.replace(/\+/g, ' '));

    // 2) HTML-entity decode (turn &amp; → &, &#39; → ', etc.)
    const ta = document.createElement('textarea');
    ta.innerHTML = urlDecoded;
    const entityDecoded = ta.value;

    return entityDecoded;
  }

  // --- Handle single fields ---
  document.querySelectorAll('[data-field]').forEach(el => {
    const key = el.getAttribute('data-field');
    const value = getParam(key);
    if (!value) return;

    // SVG <image> needs href; <img> needs src.
    if (el.tagName === 'IMG') {
      el.src = value;
      return;
    }
    if (el.tagName === 'IMAGE') {
      // Set both modern and legacy xlink for broader SVG support
      el.setAttribute('href', value);
      el.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', value);
      return;
    }

    // For text in SVG/HTML, set textContent (NOT innerHTML).
    el.textContent = value;
  });

  // --- Handle chained fields (e.g. data-chain="name,breed,color") ---
  document.querySelectorAll('[data-chain]').forEach(el => {
    const keys = el.getAttribute('data-chain').split(',').map(s => s.trim()).filter(Boolean);
    const parts = keys.map(k => getParam(k)).filter(v => v && v.length);
    if (parts.length) {
      // Join with a single space and set as plain text
      el.textContent = parts.join(' ');
    }
  });
});
