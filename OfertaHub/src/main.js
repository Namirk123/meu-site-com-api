// Ponto de entrada: monta a página inicial.
// Se algo der errado, mostra o erro na tela em vez de deixá-la em branco.
try {
  HomePage(document.getElementById('app'));
} catch (error) {
  console.error(error);
  document.getElementById('app').innerHTML =
    '<p style="padding:2rem;font-family:system-ui">Erro ao iniciar o site: ' + error.message + '</p>';
}
