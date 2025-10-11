// ShowTails Pedigree Builder JS
// Supports: data-field, data-chain (space separated), <img> + SVG <image>

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
// --- Zoom and Pan for SVG ---
const svg = document.getElementById('pedigree-svg');
let scale = 1, panX = 0, panY = 0, isDragging = false, startX, startY;

svg.addEventListener('wheel', e => {
  e.preventDefault();
  const zoomFactor = 0.1;
  scale += (e.deltaY < 0 ? zoomFactor : -zoomFactor);
  scale = Math.min(Math.max(scale, 0.5), 4); // limit zoom range
  updateTransform();
});

svg.addEventListener('pointerdown', e => {
  isDragging = true;
  startX = e.clientX - panX;
  startY = e.clientY - panY;
  svg.setPointerCapture(e.pointerId);
});

svg.addEventListener('pointermove', e => {
  if (!isDragging) return;
  panX = e.clientX - startX;
  panY = e.clientY - startY;
  updateTransform();
});

svg.addEventListener('pointerup', () => (isDragging = false));
svg.addEventListener('pointercancel', () => (isDragging = false));

function updateTransform() {
  svg.setAttribute('transform', `translate(${panX},${panY}) scale(${scale})`);
}
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
