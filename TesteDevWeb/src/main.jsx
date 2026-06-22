// arquivo main.jsx
// este arquivo inicializa o react e mostra as páginas

// importações do react
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

// importamos o css
import "./index.css";

// importamos os componentes
import Login from "./Login.jsx";
import Home from "./home.jsx";

// importamos a função pegarUsuarioLogado para verificar se o usuário já está logado
import { pegarUsuarioLogado } from "./AuthContext.jsx";

// componente principal do app
// Export component to enable React Fast Refresh
export function App() {
  // verificamos se o usuário já está logado quando o app inicia
  var usuarioLogado = pegarUsuarioLogado();
  // se estiver logado, começamos na home, senão no login
  var paginaInicial = usuarioLogado ? "home" : "login";

  // useState é um hook do React que salva um valor e avisa o React quando mudar
  // quando esse valor mudar, o React atualiza a página automaticamente
  var [paginaAtual, setarPaginaAtual] = useState(paginaInicial);

  // função pra trocar de página
  function trocarPagina(novaPagina) {
    // usamos o setarPaginaAtual para mudar o estado
    // isso faz com que o React re-renderize o app e mostre a nova página
    setarPaginaAtual(novaPagina);
  }

  // função pra ver qual página mostrar
  // retorna o componente certo baseado na página atual
  function pegarPagina() {
    if (paginaAtual === "home") {
      // passamos a função trocarPagina para o Home também, pra poder voltar pro login
      return <Home trocarPagina={trocarPagina} />;
    } else {
      // passamos a função trocarPagina para o Login, pra poder ir pra home
      return <Login trocarPagina={trocarPagina} />;
    }
  }

  // retorna o que deve ser mostrado na tela
  return pegarPagina();
}

// aqui eu inicializo o app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// não precisamos mais exportar a função trocarPagina, porque vamos passá-la como propriedade (props)
