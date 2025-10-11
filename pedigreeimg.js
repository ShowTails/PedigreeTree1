
// ShowTails Pedigree Builder JS
// Supports: data-field, data-chain (space separated), <img> + SVG <image>

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  // --- Handle single fields ---
  document.querySelectorAll('[data-field]').forEach(el => {
    const key = el.getAttribute('data-field');
    const value = params.get(key);
    if (!value) return;

    const decoded = decodeURIComponent(value);

    // Handle images
    if (el.tagName === 'IMG' || el.tagName === 'IMAGE') {
      // For standard <img>
      el.src = decoded;
      // For SVG <image>
      el.setAttribute('href', decoded);
    }
    // Handle HTML snippets passed from Glide (like <img> tags built in a Template)
    else if (key.toLowerCase().includes('html')) {
      el.innerHTML = decoded;
    }
    // Handle plain text fields
    else {
      el.textContent = decoded;
    }
  });

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
