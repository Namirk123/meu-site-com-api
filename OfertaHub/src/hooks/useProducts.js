// Hook simples: busca os dados na API e avisa a interface sobre o estado.
// status: 'loading' | 'ready'    source: 'api' | 'fallback'

function useProducts(onChange) {
  const state = { status: 'loading', source: null, products: [], categories: [] };
  const update = (changes) => { Object.assign(state, changes); onChange({ ...state }); };

  async function load() {
    update({ status: 'loading' });
    try {
      // Requisições reais à API externa
      const [products, categories] = await Promise.all([getProducts(), getCategories()]);
      update({ status: 'ready', source: 'api', products, categories });
    } catch (error) {
      console.warn('API indisponível, usando dados de demonstração:', error);
      const categories = [...new Set(FALLBACK_PRODUCTS.map((p) => p.category))];
      update({ status: 'ready', source: 'fallback', products: FALLBACK_PRODUCTS, categories });
    }
  }

  return { load };
}
