// Funções de apoio para exibir os dados.
const CATEGORY_LABELS = {
  electronics: 'Eletrônicos',
  jewelery: 'Joias',
  "men's clothing": 'Moda masculina',
  "women's clothing": 'Moda feminina',
};

const categoryLabel = (c) => CATEGORY_LABELS[c] || c;
const formatPrice = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' });
const escapeHtml = (t) =>
  String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Imagem do produto; se não houver (dados fictícios) ou falhar, mostra um placeholder.
const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#E8EDF3"/><path d="M60 80h80l-8 60H68z" fill="#C3CEDB"/></svg>');
const productImage = (p) => p.image || PLACEHOLDER;

function stars(rate) {
  const full = Math.round(rate);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}
