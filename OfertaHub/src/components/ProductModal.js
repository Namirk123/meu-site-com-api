
const BUY_URL = 'https://example.com/comprar'; // URL demonstrativa

function render(product) {
  return `
    <div class="modal__content">
      <img class="modal__img" src="${productImage(product)}" alt="${escapeHtml(product.title)}"
           onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
      <div class="modal__info">
        <span class="tag">${categoryLabel(product.category)}</span>
        <h2 id="modal-title">${escapeHtml(product.title)}</h2>
        <div class="rating"><span class="stars">${stars(product.rating.rate)}</span>
          <span>${product.rating.rate} (${product.rating.count} avaliações)</span></div>
        <p>${escapeHtml(product.description)}</p>
        <strong class="price price--big">${formatPrice(product.price)}</strong>
        <a class="btn btn--buy" href="${BUY_URL}?produto=${product.id}" target="_blank" rel="noopener">Comprar</a>
      </div>
    </div>`;
}

// Abre o modal com os dados do card e, em seguida, busca o produto completo
// na API pelo id (getProductById) — segunda demonstração da integração.
async function openProductModal(product, fromApi) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'modal-title');
  modal.innerHTML = `<div class="modal__box"><button class="modal__close" aria-label="Fechar">×</button>
    <div id="modal-body">${render(product)}</div></div>`;
  document.body.append(modal);

  const close = () => { modal.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = (e) => e.key === 'Escape' && close();
  document.addEventListener('keydown', onKey);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal__close')) close();
  });

  if (fromApi) {
    try {
      const full = await getProductById(product.id);
      const body = modal.querySelector('#modal-body');
      if (body) body.innerHTML = render(full);
    } catch { /* mantém os dados já carregados */ }
  }
}
