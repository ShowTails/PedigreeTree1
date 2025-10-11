// ShowTails Pedigree Builder JS
// Supports: data-field, data-chain (space separated), <img> + SVG <image>

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  // --- Handle single fields ---
  document.querySelectorAll('[data-field]').forEach(el => {
    const key = el.getAttribute('data-field');
    const value = params.get(key);
    if (!value) return;

    // Decode once, then clean up double encoding (e.g. %3A%2F)
    const decoded = decodeURIComponent(value)
      .replace(/%3A/g, ':')
      .replace(/%2F/g, '/');

    // --- Handle image fields ---
    if (el.tagName === 'IMG' || el.tagName === 'IMAGE') {
      // Set both SVG href and IMG src for cross-compatibility
      el.setAttribute('href', decoded); // SVG <image>
      el.src = decoded;                 // Standard <img>

      console.log(`Loaded image for ${key}: ${decoded}`);
    }

    // --- Handle HTML snippet fields (if Glide sends <img> tags) ---
    else if (key.toLowerCase().includes('html')) {
      el.innerHTML = decoded;
    }

    // --- Handle normal text fields ---
    else {
      el.textContent = decoded;
    }
  });

  // --- Handle chained fields (e.g. data-chain="name,breed,color") ---
  document.querySelectorAll('[data-chain]').forEach(el => {
    const keys = el.getAttribute('data-chain').split(',').map(k => k.trim());
    const parts = [];

    keys.forEach(key => {
      const val = params.get(key);
      if (val) parts.push(
        decodeURIComponent(val)
          .replace(/%3A/g, ':')
          .replace(/%2F/g, '/')
      );
    });

    if (parts.length > 0) {
      const joined = parts.join(' '); // space-separated
      el.textContent = joined;
    }
  });
});
