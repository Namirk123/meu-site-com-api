
function HomePage(root) {
  // Filtros escolhidos pelo usuário
  const filters = { search: '', category: 'all', sort: 'default' };
  let data = { status: 'loading', source: null, products: [], categories: [] };

  root.innerHTML = `
    ${Header()}
    <main class="container">
      <div id="api-status"></div>
      <section><h2>Em destaque</h2><div class="grid" id="featured"></div></section>
      <section>
        <div class="toolbar">
          <h2>Todos os produtos <span id="count" class="muted"></span></h2>
          <label class="sort">Ordenar por
            <select id="sort">
              <option value="default">Relevância</option>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>
          </label>
        </div>
        <div class="grid" id="grid"></div>
      </section>
    </main>
    <footer class="footer"><div class="container">OfertaHub — projeto acadêmico de integração com API · dados: fakestoreapi.com</div></footer>`;

  const $ = (id) => root.querySelector(id);

  // ----- busca de dados (hook) -----
  const { load } = useProducts((newData) => { data = newData; render(); });

  // ----- render -----
  function visibleProducts() {
    let list = data.products.filter((p) =>
      (filters.category === 'all' || p.category === filters.category) &&
      p.title.toLowerCase().includes(filters.search));
    if (filters.sort === 'asc') list = [...list].sort((a, b) => a.price - b.price);
    if (filters.sort === 'desc') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }

  function renderStatus() {
    const box = $('#api-status');
    if (data.status === 'loading') {
      box.innerHTML = `<div class="banner banner--loading"><span class="spinner"></span> Carregando produtos da API…</div>`;
    } else if (data.source === 'api') {
      box.innerHTML = `<div class="banner banner--ok"><span class="dot"></span> Produtos carregados através de API externa
        <code>GET fakestoreapi.com/products</code></div>`;
    } else {
      box.innerHTML = `<div class="banner banner--warn">Não foi possível acessar a API agora. Exibindo produtos de demonstração.
        <button class="btn btn--small" id="retry">Tentar novamente</button></div>`;
      $('#retry').onclick = load;
    }
  }

  function renderCategories() {
    const all = ['all', ...data.categories];
    $('#categories').innerHTML = all.map((c) =>
      `<button class="chip ${c === filters.category ? 'is-active' : ''}" data-category="${c}">
        ${c === 'all' ? 'Todos' : categoryLabel(c)}</button>`).join('');
  }

  function renderProducts() {
    if (data.status === 'loading') {
      $('#featured').innerHTML = $('#grid').innerHTML = '<div class="skeleton"></div>'.repeat(4);
      $('#count').textContent = '';
      return;
    }
    const featured = [...data.products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 4);
    $('#featured').innerHTML = featured.map(ProductCard).join('');

    const list = visibleProducts();
    $('#count').textContent = `(${list.length})`;
    $('#grid').innerHTML = list.length
      ? list.map(ProductCard).join('')
      : '<p class="empty">Nenhum produto encontrado. Tente outra busca ou categoria.</p>';
  }

  function render() { renderStatus(); renderCategories(); renderProducts(); }

  // ----- eventos -----
  $('#search').oninput = (e) => { filters.search = e.target.value.toLowerCase(); renderProducts(); };
  $('#sort').onchange = (e) => { filters.sort = e.target.value; renderProducts(); };
  root.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-category]');
    if (chip) { filters.category = chip.dataset.category; renderCategories(); renderProducts(); }

    const btn = e.target.closest('[data-product-id]');
    if (btn) {
      const product = data.products.find((p) => p.id === Number(btn.dataset.productId));
      openProductModal(product, data.source === 'api');
    }
  });

  render();
  load();
}
