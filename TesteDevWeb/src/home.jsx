// arquivo home.jsx
// esta é a página inicial do e-commerce que só aparece pra quem tá logado

// importo os hooks do react pra controlar estados, refs e limpeza dos timers
import { useEffect, useRef, useState } from "react";

// importo o css da home
import "./home.css";

// importo as funções de auth
import { logout, pegarUsuarioLogado } from "./AuthContext.jsx";

// importo o helper pra montar caminhos corretos de assets públicos no deploy
import { pegarAssetPublico } from "./utils/publicAsset.js";

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

// duração da animação do carrinho em milissegundos
// deixei em 420ms porque fica rápida, fluida e sem atrapalhar o clique seguinte
const DURACAO_ANIMACAO_CARRINHO = 420;

// ícone de carrinho em svg
// uso esse desenho inline pra manter compatibilidade e poder herdar as cores do tema
function IconeCarrinho(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <path
        d="M3 4h2l2.2 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="19" r="1.6" fill="currentColor" />
      <circle cx="17" cy="19" r="1.6" fill="currentColor" />
    </svg>
  );
}

// componente da página home
// agora ele recebe a função trocarPagina como propriedade
function Home(props) {
  // pegamos a função trocarPagina das propriedades
  var trocarPagina = props.trocarPagina;

  // monto o caminho do logo público
  // isso evita quebrar o carregamento da imagem em subpastas do GitHub Pages
  var logoDaAplicacao = pegarAssetPublico("LogoTeste.png");

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

  // esse estado guarda todas as animações ativas do carrinho
  // uso uma lista para permitir uma animação nova a cada clique, mesmo em sequência
  var [animacoesCarrinho, setarAnimacoesCarrinho] = useState([]);

  // ref do carrinho fixo no canto superior direito
  var referenciaCarrinho = useRef(null);

  // guardo os timeouts de remoção para limpar tudo quando o componente sair da tela
  var timeoutsAnimacaoCarrinho = useRef([]);

  // contador simples para dar um identificador diferente a cada animação criada
  var proximoIdAnimacaoCarrinho = useRef(0);

  // quando o componente desmontar, limpo o timeout pendente
  useEffect(function () {
    return function () {
      timeoutsAnimacaoCarrinho.current.forEach(function (timeoutAtual) {
        clearTimeout(timeoutAtual);
      });

      timeoutsAnimacaoCarrinho.current = [];
    };
  }, []);

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

  // essa função calcula a origem do clique e dispara a animação até o carrinho fixo
  function dispararAnimacaoCarrinho(evento) {
    if (!referenciaCarrinho.current || !evento.currentTarget) {
      return;
    }

    // pego a posição do botão clicado pra usar como fallback em mobile e teclado
    var botaoRect = evento.currentTarget.getBoundingClientRect();

    // pego a posição final do carrinho fixo
    var carrinhoRect = referenciaCarrinho.current.getBoundingClientRect();

    // tento usar o ponto exato do clique
    // se não existir coordenada, uso o centro do botão pressionado
    var pontoInicialX =
      typeof evento.clientX === "number" && evento.clientX > 0
        ? evento.clientX
        : botaoRect.left + botaoRect.width / 2;
    var pontoInicialY =
      typeof evento.clientY === "number" && evento.clientY > 0
        ? evento.clientY
        : botaoRect.top + botaoRect.height / 2;

    // calculo o centro visual do carrinho de destino
    var pontoFinalX = carrinhoRect.left + carrinhoRect.width / 2;
    var pontoFinalY = carrinhoRect.top + carrinhoRect.height / 2;

    // posiciono o ícone animado já centralizado na origem
    var origemX = pontoInicialX - 16;
    var origemY = pontoInicialY - 16;

    // calculo o quanto ele precisa se mover até chegar no destino
    var deslocamentoX = pontoFinalX - pontoInicialX;
    var deslocamentoY = pontoFinalY - pontoInicialY;

    // calculo um ponto intermediário pra dar a sensação de flutuação
    var pontoIntermediarioX = deslocamentoX * 0.45;
    var pontoIntermediarioY = deslocamentoY * 0.45 - 36;

    // cada clique recebe um id próprio para a remoção acontecer no item certo
    var idDaAnimacao = proximoIdAnimacaoCarrinho.current;
    proximoIdAnimacaoCarrinho.current = proximoIdAnimacaoCarrinho.current + 1;

    var novaAnimacao = {
      id: idDaAnimacao,
      origemX: origemX,
      origemY: origemY,
      deslocamentoX: deslocamentoX,
      deslocamentoY: deslocamentoY,
      pontoIntermediarioX: pontoIntermediarioX,
      pontoIntermediarioY: pontoIntermediarioY,
    };

    // adiciono a animação nova à lista atual para que cada clique seja exibido
    setarAnimacoesCarrinho(function (animacoesAtuais) {
      return animacoesAtuais.concat(novaAnimacao);
    });

    var timeoutRemocao = setTimeout(function () {
      setarAnimacoesCarrinho(function (animacoesAtuais) {
        return animacoesAtuais.filter(function (animacaoAtual) {
          return animacaoAtual.id !== idDaAnimacao;
        });
      });

      timeoutsAnimacaoCarrinho.current =
        timeoutsAnimacaoCarrinho.current.filter(function (timeoutAtual) {
          return timeoutAtual !== timeoutRemocao;
        });
    }, DURACAO_ANIMACAO_CARRINHO);

    timeoutsAnimacaoCarrinho.current.push(timeoutRemocao);
  }

  // função que simula salvar interesse em um produto
  function adicionarInteresse(nomeDoProduto, evento) {
    setarInteressesSalvos(function (valorAtual) {
      return valorAtual + 1;
    });
    setarUltimoProduto(nomeDoProduto);

    // disparo a animação visual que leva o ícone até o carrinho
    dispararAnimacaoCarrinho(evento);

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
      {/* carrinho fixo no canto superior direito */}
      <div
        ref={referenciaCarrinho}
        className="home-floating-cart"
        data-testid="home-cart-anchor"
      >
        <div className="home-floating-cart-icon-wrapper">
          <IconeCarrinho className="home-floating-cart-icon" />
        </div>
        <div className="home-floating-cart-text">
          <span>Carrinho</span>
          <strong>{interessesSalvos}</strong>
        </div>
      </div>

      {/* indicadores animados que voam do clique até o carrinho */}
      {animacoesCarrinho.map(function (animacaoCarrinho) {
        return (
          <div
            key={animacaoCarrinho.id}
            className="home-flying-cart"
            data-testid="home-flying-cart"
            style={{
              left: animacaoCarrinho.origemX + "px",
              top: animacaoCarrinho.origemY + "px",
              "--cart-mid-x": animacaoCarrinho.pontoIntermediarioX + "px",
              "--cart-mid-y": animacaoCarrinho.pontoIntermediarioY + "px",
              "--cart-delta-x": animacaoCarrinho.deslocamentoX + "px",
              "--cart-delta-y": animacaoCarrinho.deslocamentoY + "px",
            }}
          >
            <IconeCarrinho className="home-flying-cart-icon" />
          </div>
        );
      })}

      <div className="home-shell">
        {/* cabeçalho superior da home */}
        <header className="home-topbar">
          <div className="home-brand">
            <img src={logoDaAplicacao} alt="Logo" className="home-logo" />
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
                    onClick={(evento) =>
                      adicionarInteresse(produto.nome, evento)
                    }
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
