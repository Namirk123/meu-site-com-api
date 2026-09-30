
// Recebe um produto (vindo da API) e devolve o HTML do card.
function ProductCard(product) {
  const shortDescription = product.description.length > 80
    ? product.description.slice(0, 80).trim() + '…'
    : product.description;

  return `
    <article class="card">
      <div class="card__img">
        <img src="${productImage(product)}" alt="${escapeHtml(product.title)}" loading="lazy"
             onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
      </div>
      <div class="card__body">
        <span class="tag">${categoryLabel(product.category)}</span>
        <h3 class="card__title">${escapeHtml(product.title)}</h3>
        <p class="card__desc">${escapeHtml(shortDescription)}</p>
        <div class="rating" title="${product.rating.rate} de 5">
          <span class="stars">${stars(product.rating.rate)}</span>
          <span>${product.rating.rate} (${product.rating.count})</span>
        </div>
        <div class="card__footer">
          <strong class="price">${formatPrice(product.price)}</strong>
          <button class="btn btn--primary" data-product-id="${product.id}">Ver produto</button>
        </div>
      </div>
    </article>`;
}
