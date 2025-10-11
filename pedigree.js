// ShowTails Pedigree Builder JS
// Supports: data-field, data-chain (space separated), <img> + SVG <image>

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  // --- Handle chained fields ---
  document.querySelectorAll('[data-chain]').forEach(el => {
    const keys = el.getAttribute('data-chain').split(',').map(k => k.trim());
    const parts = [];

    keys.forEach(key => {
      const val = params.get(key);
      if (val) parts.push(decodeURIComponent(val));
    });

    if (parts.length > 0) {
      const joined = parts.join(' '); // space-separated chaining
      el.textContent = joined;
    }
  });
});
