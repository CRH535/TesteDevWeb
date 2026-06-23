// helper pra montar caminhos de assets públicos
// isso evita quebrar imagens e ícones quando o site roda em subpastas do GitHub Pages
function pegarAssetPublico(nomeDoArquivo) {
  return `${import.meta.env.BASE_URL}${nomeDoArquivo}`;
}

export { pegarAssetPublico };
