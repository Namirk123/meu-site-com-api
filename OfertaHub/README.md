# OfertaHub — Catálogo de produtos com API externa

Projeto acadêmico que consome a **Fake Store API** (https://fakestoreapi.com) e monta o catálogo dinamicamente.

## Como executar
Basta abrir o `index.html` no navegador (precisa de internet para acessar a API). Opcional: `npx serve .`

## Onde a API é consumida
| Arquivo | Papel |
|---|---|
| `src/services/api.js` | **Único** lugar com `fetch`: `getProducts()`, `getProductById(id)`, `getCategories()` |
| `src/hooks/useProducts.js` | Chama a API, controla o carregamento e aciona o fallback |
| `src/services/fallbackData.js` | Dados fictícios, usados só se a API falhar |
| `src/pages/HomePage.js` | Filtros, busca, ordenação e a indicação "Produtos carregados através de API externa" |
| `src/components/` | Cards, modal do produto e cabeçalho (só desenham os dados) |

## Fluxo
1. A página abre e mostra o estado de carregamento.
2. `useProducts` chama `getProducts()` e `getCategories()`.
3. Sucesso: banner verde "Produtos carregados através de API externa".
4. Falha ou timeout (6s): banner amarelo, dados fictícios e botão "Tentar novamente".
5. Ao clicar em "Ver produto", o modal chama `getProductById(id)` para buscar o item completo.

Dica para a apresentação: abra a aba **Network** do navegador (F12) e mostre as requisições para `fakestoreapi.com`.
