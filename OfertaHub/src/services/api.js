// ============================================================
// CAMADA DE API — é aqui que o site conversa com a API externa.
// Nenhum outro arquivo faz fetch. A interface só chama estas funções.
// ============================================================
const BASE_URL = 'https://fakestoreapi.com';

async function request(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000); // desiste após 6s

  try {
    const response = await fetch(`${BASE_URL}${path}`, { signal: controller.signal });
    if (!response.ok) throw new Error(`Erro ${response.status} ao acessar ${path}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

// GET https://fakestoreapi.com/products
function getProducts() {
  return request('/products');
}

// GET https://fakestoreapi.com/products/:id
function getProductById(id) {
  return request(`/products/${id}`);
}

// GET https://fakestoreapi.com/products/categories
function getCategories() {
  return request('/products/categories');
}
