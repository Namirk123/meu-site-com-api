// Dados fictícios usados SOMENTE se a API externa estiver indisponível.
// Mesmo formato de resposta da Fake Store API.
const item = (id, title, price, category, description, rate, count) => ({
  id, title, price, category, description, image: null, rating: { rate, count },
});

const FALLBACK_PRODUCTS = [
  item(1, 'Mochila para notebook 15"', 109.95, "men's clothing", 'Mochila resistente com compartimento acolchoado para notebook e bolsos organizadores para o dia a dia.', 3.9, 120),
  item(2, 'Camiseta slim fit', 22.3, "men's clothing", 'Camiseta de algodão com corte ajustado, confortável para uso diário.', 4.1, 259),
  item(3, 'Pulseira banhada a ouro', 168, 'jewelery', 'Pulseira delicada banhada a ouro, ideal para presentear.', 4.6, 400),
  item(4, 'SSD externo 1TB', 64, 'electronics', 'Armazenamento portátil de alta velocidade com conexão USB-C.', 4.8, 205),
  item(5, 'Jaqueta corta-vento feminina', 56.99, "women's clothing", 'Jaqueta leve, com capuz e proteção contra vento e garoa.', 2.6, 235),
  item(6, 'Monitor 24" Full HD', 199.99, 'electronics', 'Tela IPS de 24 polegadas com bordas finas e ótima reprodução de cores.', 4.2, 140),
];
