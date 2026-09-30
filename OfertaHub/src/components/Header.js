function Header() {
  return `
    <header class="header">
      <div class="container header__row">
        <a class="logo" href="./"><img src="src/assets/logo.svg" alt="" width="32" height="32"><span>OfertaHub</span></a>
        <form class="search" role="search" onsubmit="return false">
          <input id="search" type="search" placeholder="Buscar produtos…" aria-label="Buscar produtos">
        </form>
      </div>
      <nav class="container categories" id="categories" aria-label="Categorias"></nav>
    </header>`;
}
