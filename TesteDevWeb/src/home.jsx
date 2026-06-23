// arquivo home.jsx
// esta é a página inicial do e-commerce que só aparece pra quem tá logado

// importo o useState pra controlar as etapas da home e as interações locais
import { useState } from "react";

// importo o css da home
import "./Home.css";

// importo as funções de auth
import { logout, pegarUsuarioLogado } from "./AuthContext.jsx";

// lista com as etapas progressivas da jornada da home
const etapasDaHome = [
  {
    numero: 1,
    titulo: "Boas-vindas",
    descricao: "Apresenta a vitrine principal e recebe o usuário após o login.",
  },
  {
    numero: 2,
    titulo: "Categorias",
    descricao: "Ajuda o usuário a escolher rapidamente o que deseja explorar.",
  },
  {
    numero: 3,
    titulo: "Destaques",
    descricao: "Mostra produtos principais com ação rápida de interesse.",
  },
  {
    numero: 4,
    titulo: "Próximo passo",
    descricao: "Resume a jornada e indica os próximos recursos da plataforma.",
  },
];

// lista simples de categorias em destaque
const categoriasDaLoja = [
  {
    nome: "Todos",
    icone: "✨",
    descricao: "Visualize tudo que está em destaque na loja.",
  },
  {
    nome: "Eletronicos",
    icone: "💻",
    descricao: "Tecnologia para produtividade, estudo e entretenimento.",
  },
  {
    nome: "Moda",
    icone: "🛍️",
    descricao: "Pecas essenciais e novidades para o dia a dia.",
  },
  {
    nome: "Casa",
    icone: "🏠",
    descricao: "Itens para deixar a rotina mais pratica e organizada.",
  },
];

// produtos simulados da vitrine inicial
const produtosDestaque = [
  {
    id: 1,
    nome: "Notebook Vision Pro",
    categoria: "Eletronicos",
    preco: "R$ 4.299,00",
    descricao:
      "Desempenho para trabalho, estudo e multitarefa com design leve.",
    etiqueta: "Mais vendido",
  },
  {
    id: 2,
    nome: "Jaqueta Urban Style",
    categoria: "Moda",
    preco: "R$ 249,90",
    descricao: "Visual moderno com tecido confortavel para todas as estacoes.",
    etiqueta: "Novo",
  },
  {
    id: 3,
    nome: "Kit Decor Living",
    categoria: "Casa",
    preco: "R$ 189,90",
    descricao:
      "Conjunto com pecas decorativas para sala, quarto ou escritorio.",
    etiqueta: "Oferta",
  },
  {
    id: 4,
    nome: "Fone Pulse Max",
    categoria: "Eletronicos",
    preco: "R$ 319,90",
    descricao: "Audio imersivo com bateria prolongada e cancelamento de ruido.",
    etiqueta: "Frete gratis",
  },
];

// benefícios principais que reforçam confiança na plataforma
const beneficiosDaLoja = [
  "Experiencia simples para navegar e descobrir ofertas.",
  "Jornada guiada em etapas para facilitar a exploracao da home.",
  "Area de usuario integrada ao fluxo de autenticacao existente.",
];

// componente da página home
// agora ele recebe a função trocarPagina como propriedade
function Home(props) {
  // pegamos a função trocarPagina das propriedades
  var trocarPagina = props.trocarPagina;

  // pego os dados do usuário logado
  var usuario = pegarUsuarioLogado();

  // estado pra controlar em qual etapa progressiva o usuário está
  var [etapaAtual, setarEtapaAtual] = useState(1);

  // estado da categoria selecionada na vitrine
  var [categoriaSelecionada, setarCategoriaSelecionada] = useState("Todos");

  // contador simples de itens de interesse
  var [interessesSalvos, setarInteressesSalvos] = useState(0);

  // guardo o último produto marcado pra dar feedback ao usuário
  var [ultimoProduto, setarUltimoProduto] = useState("");

  // função pra quando clicar em sair
  function botaoSair() {
    // faço o logout
    logout();
    // vou pra página de login
    trocarPagina("login");
  }

  // função pra avançar a jornada da home
  function avancarEtapa() {
    if (etapaAtual < etapasDaHome.length) {
      setarEtapaAtual(etapaAtual + 1);
    }
  }

  // função pra voltar a etapa anterior
  function voltarEtapa() {
    if (etapaAtual > 1) {
      setarEtapaAtual(etapaAtual - 1);
    }
  }

  // função pra escolher uma categoria e levar o usuário pra etapa de produtos
  function escolherCategoria(nomeDaCategoria) {
    setarCategoriaSelecionada(nomeDaCategoria);
    if (etapaAtual < 3) {
      setarEtapaAtual(3);
    }
  }

  // função que simula salvar interesse em um produto
  function adicionarInteresse(nomeDoProduto) {
    setarInteressesSalvos(interessesSalvos + 1);
    setarUltimoProduto(nomeDoProduto);
    if (etapaAtual < 4) {
      setarEtapaAtual(4);
    }
  }

  // filtro simples dos produtos baseado na categoria selecionada
  var produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtosDestaque
      : produtosDestaque.filter(function (produto) {
          return produto.categoria === categoriaSelecionada;
        });

  // se não tiver usuário (não deveria acontecer mas por segurança)
  if (!usuario) {
    return (
      <div className="home-container">
        <div className="home-session-alert">
          <h1>Erro! Voce nao esta logado.</h1>
          <p>Faca login novamente para acessar a pagina inicial.</p>
          <button onClick={() => trocarPagina("login")}>Ir pra Login</button>
        </div>
      </div>
    );
  }

  // aqui mostro a página inicial do e-commerce
  return (
    <div className="home-container">
      <div className="home-shell">
        {/* cabeçalho superior da home */}
        <header className="home-topbar">
          <div className="home-brand">
            <img src="/LogoTeste.png" alt="Logo" className="home-logo" />
            <div>
              <p className="home-brand-tag">Teste Dev Web Store</p>
              <h1 className="home-brand-title">Pagina inicial do e-commerce</h1>
            </div>
          </div>

          <div className="home-topbar-actions">
            <div className="home-topbar-chip">
              <span>Usuario</span>
              <strong>{usuario.nome}</strong>
            </div>
            <div className="home-topbar-chip">
              <span>Interesses</span>
              <strong>{interessesSalvos}</strong>
            </div>
            <button className="home-logout-button" onClick={botaoSair}>
              Sair da conta
            </button>
          </div>
        </header>

        {/* hero principal com resumo do usuário e entrada da jornada */}
        <section className="home-hero">
          <div className="home-hero-copy">
            <p className="home-eyebrow">Pos-login preservado</p>
            <h2 className="home-hero-title">
              Bem-vindo, {usuario.nome}! Sua jornada de compra comeca aqui.
            </h2>
            <p className="home-hero-text">
              A autenticacao continua igual e, assim que o login termina com
              sucesso, voce chega diretamente nesta pagina inicial com uma
              navegacao em etapas progressivas.
            </p>

            <div className="home-hero-buttons">
              <button className="home-primary-button" onClick={avancarEtapa}>
                Avancar para a proxima etapa
              </button>
              <button className="home-secondary-button" onClick={voltarEtapa}>
                Voltar etapa
              </button>
            </div>
          </div>

          <aside className="home-user-panel">
            <div className="home-user-card">
              <span className="home-user-icon">👤</span>
              <div>
                <p className="home-user-label">Conta autenticada</p>
                <h3 className="home-user-name">{usuario.nome}</h3>
                <p className="home-user-email">{usuario.email}</p>
              </div>
            </div>

            <div className="home-stage-card">
              <p className="home-stage-label">Etapa atual</p>
              <h3>
                {etapasDaHome[etapaAtual - 1].numero}.{" "}
                {etapasDaHome[etapaAtual - 1].titulo}
              </h3>
              <p>{etapasDaHome[etapaAtual - 1].descricao}</p>
            </div>
          </aside>
        </section>

        {/* barra com o fluxo progressivo da home */}
        <section className="home-progress">
          {etapasDaHome.map(function (etapa) {
            var ativa = etapa.numero === etapaAtual;
            var concluida = etapa.numero < etapaAtual;

            return (
              <button
                key={etapa.numero}
                className={
                  ativa
                    ? "home-step-card home-step-card-active"
                    : concluida
                      ? "home-step-card home-step-card-done"
                      : "home-step-card"
                }
                onClick={() => setarEtapaAtual(etapa.numero)}
              >
                <span className="home-step-number">Etapa {etapa.numero}</span>
                <strong>{etapa.titulo}</strong>
                <small>{etapa.descricao}</small>
              </button>
            );
          })}
        </section>

        {/* seção com as categorias da loja */}
        <section className="home-section">
          <div className="home-section-heading">
            <div>
              <p className="home-section-tag">Etapa 2</p>
              <h2>Escolha uma categoria para explorar</h2>
            </div>
            <p>
              Cada categoria leva a vitrine para a etapa de produtos e ajuda a
              estruturar a jornada da pagina inicial.
            </p>
          </div>

          <div className="home-category-grid">
            {categoriasDaLoja.map(function (categoria) {
              var selecionada = categoria.nome === categoriaSelecionada;

              return (
                <button
                  key={categoria.nome}
                  className={
                    selecionada
                      ? "home-category-card home-category-card-active"
                      : "home-category-card"
                  }
                  onClick={() => escolherCategoria(categoria.nome)}
                >
                  <span className="home-category-icon">{categoria.icone}</span>
                  <strong>{categoria.nome}</strong>
                  <p>{categoria.descricao}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* seção com os produtos em destaque */}
        <section className="home-section">
          <div className="home-section-heading">
            <div>
              <p className="home-section-tag">Etapa 3</p>
              <h2>Produtos em destaque</h2>
            </div>
            <p>
              Categoria atual: <strong>{categoriaSelecionada}</strong>
            </p>
          </div>

          <div className="home-product-grid">
            {produtosFiltrados.map(function (produto) {
              return (
                <article key={produto.id} className="home-product-card">
                  <span className="home-product-badge">{produto.etiqueta}</span>
                  <p className="home-product-category">{produto.categoria}</p>
                  <h3>{produto.nome}</h3>
                  <p className="home-product-description">
                    {produto.descricao}
                  </p>
                  <strong className="home-product-price">
                    {produto.preco}
                  </strong>
                  <button
                    className="home-primary-button"
                    onClick={() => adicionarInteresse(produto.nome)}
                  >
                    Tenho interesse
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* seção final com resumo e próximos passos */}
        <section className="home-section home-summary-section">
          <div className="home-section-heading">
            <div>
              <p className="home-section-tag">Etapa 4</p>
              <h2>Resumo da experiencia inicial</h2>
            </div>
            <p>
              Aqui ficam os pontos principais da home e o que ja esta
              funcionando sem alterar o core dos modulos existentes.
            </p>
          </div>

          <div className="home-summary-grid">
            <div className="home-summary-card">
              <h3>Fluxo preservado</h3>
              <p>
                Login e cadastro continuam operando com as mesmas regras de
                autenticacao e validacao do projeto.
              </p>
            </div>

            <div className="home-summary-card">
              <h3>Redirecionamento pos-login</h3>
              <p>
                O usuario autenticado vai direto para esta home por meio do
                fluxo existente de troca de pagina.
              </p>
            </div>

            <div className="home-summary-card">
              <h3>Interacao validada</h3>
              <p>
                Ultimo produto marcado:{" "}
                <strong>
                  {ultimoProduto || "Nenhum produto selecionado ainda."}
                </strong>
              </p>
            </div>
          </div>

          <div className="home-benefits-panel">
            <div>
              <h3>O que esta pronto nesta etapa</h3>
              <ul className="home-benefits-list">
                {beneficiosDaLoja.map(function (beneficio) {
                  return <li key={beneficio}>{beneficio}</li>;
                })}
              </ul>
            </div>

            <div className="home-callout-card">
              <p className="home-callout-tag">Proximo incremento sugerido</p>
              <h3>Busca, carrinho real e checkout</h3>
              <p>
                A base visual e o fluxo inicial ja estao organizados para
                receber as proximas funcionalidades do e-commerce.
              </p>
              <button className="home-secondary-button" onClick={avancarEtapa}>
                Revisar etapa atual
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// exporto o componente
export default Home;
