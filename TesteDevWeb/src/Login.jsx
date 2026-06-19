// Importamos o React e o hook useState (para gerenciar estados)
import { useState } from 'react';
// Importamos o arquivo de estilos
import './Login.css';

// Funções de validação
function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

function validarSenha(senha) {
  const temLetra = /[a-zA-Z]/.test(senha);
  const temNumero = /[0-9]/.test(senha);
  const temTamanhoMinimo = senha.length >= 8;
  return temLetra && temNumero && temTamanhoMinimo;
}

// Este é o componente Login
function Login() {
  // ==========================================
  // ESTADOS GERAIS
  // ==========================================
  
  // Estado para controlar qual página exibir ('login' ou 'criar-conta')
  const [paginaAtual, setPaginaAtual] = useState('login');

  // ==========================================
  // ESTADOS DA PÁGINA DE LOGIN
  // ==========================================
  
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [senhaVisivelLogin, setSenhaVisivelLogin] = useState(false);
  const [lembrarCredenciais, setLembrarCredenciais] = useState(false);
  const [mensagemErroLogin, setMensagemErroLogin] = useState('');

  // ==========================================
  // ESTADOS DA PÁGINA DE CRIAR CONTA
  // ==========================================
  
  const [nome, setNome] = useState('');
  const [emailCriar, setEmailCriar] = useState('');
  const [senhaCriar, setSenhaCriar] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaVisivelCriar, setSenhaVisivelCriar] = useState(false);
  const [senhaVisivelConfirmar, setSenhaVisivelConfirmar] = useState(false);
  const [mensagemErroCriar, setMensagemErroCriar] = useState('');

  // ==========================================
  // FUNÇÕES DA PÁGINA DE LOGIN
  // ==========================================

  function quandoEnviarLogin(event) {
    event.preventDefault();
    setMensagemErroLogin('');

    if (emailLogin.trim() === '') {
      setMensagemErroLogin('Por favor, digite seu e-mail ou usuário!');
      return;
    }

    // Valida email apenas se o campo contiver @ (indicando que é um email
    if (emailLogin.includes('@') && !validarEmail(emailLogin)) {
      setMensagemErroLogin('Por favor, digite um e-mail válido!');
      return;
    }

    if (senhaLogin.trim() === '') {
      setMensagemErroLogin('Por favor, digite sua senha!');
      return;
    }

    if (!validarSenha(senhaLogin)) {
      setMensagemErroLogin('A senha deve ter pelo menos 8 caracteres, contendo pelo menos uma letra e um número!');
      return;
    }
  }

  function alternarVisibilidadeSenhaLogin() {
    setSenhaVisivelLogin(!senhaVisivelLogin);
  }

  // ==========================================
  // FUNÇÕES DA PÁGINA DE CRIAR CONTA
  // ==========================================

  function quandoEnviarCriarConta(event) {
    event.preventDefault();
    setMensagemErroCriar('');

    if (nome.trim() === '') {
      setMensagemErroCriar('Por favor, digite seu nome completo!');
      return;
    }

    if (emailCriar.trim() === '') {
      setMensagemErroCriar('Por favor, digite seu e-mail!');
      return;
    }

    if (!validarEmail(emailCriar)) {
      setMensagemErroCriar('Por favor, digite um e-mail válido!');
      return;
    }

    if (senhaCriar.trim() === '') {
      setMensagemErroCriar('Por favor, digite sua senha!');
      return;
    }

    if (!validarSenha(senhaCriar)) {
      setMensagemErroCriar('A senha deve ter pelo menos 8 caracteres, contendo pelo menos uma letra e um número!');
      return;
    }

    if (confirmarSenha.trim() === '') {
      setMensagemErroCriar('Por favor, confirme sua senha!');
      return;
    }

    if (senhaCriar !== confirmarSenha) {
      setMensagemErroCriar('As senhas digitadas não coincidem!');
      return;
    }
  }

  function alternarVisibilidadeSenhaCriar() {
    setSenhaVisivelCriar(!senhaVisivelCriar);
  }

  function alternarVisibilidadeConfirmarSenha() {
    setSenhaVisivelConfirmar(!senhaVisivelConfirmar);
  }

  // ==========================================
  // FUNÇÃO PARA NAVEGAR ENTRE PÁGINAS
  // ==========================================

  function irParaPagina(pagina) {
    setPaginaAtual(pagina);
    // Limpa os estados das páginas ao navegar
    if (pagina === 'login') {
      setMensagemErroCriar('');
    } else {
      setMensagemErroLogin('');
    }
  }

  // ==========================================
  // RENDERIZAÇÃO DA PÁGINA DE LOGIN
  // ==========================================
  function renderizarPaginaLogin() {
    return (
      <>
        {/* Títulos */}
        <h1 className="titulo-principal">Entrar</h1>
        <p className="subtitulo">Acesse sua conta para continuar</p>

        {/* Formulário de login */}
        <form className="formulario" onSubmit={quandoEnviarLogin}>
          
          {/* Campo de e-mail/usuário */}
          <div className="grupo-do-campo">
            <label className="rotulo-do-campo" htmlFor="campo-email">
              E-mail ou usuário
            </label>
            <div className="wrapper-do-input">
              <img src="/IconeEmail.png" alt="E-mail" className="icone-do-input-email" />
              <input
                type="text"
                id="campo-email"
                className="campo-de-entrada"
                placeholder="Digite seu e-mail ou usuário"
                value={emailLogin}
                onChange={(event) => setEmailLogin(event.target.value)}
              />
            </div>
          </div>

          {/* Campo de senha */}
          <div className="grupo-do-campo">
            <label className="rotulo-do-campo" htmlFor="campo-senha">
              Senha
            </label>
            <div className="wrapper-do-input">
              <img src="/IconeSenha.png" alt="Senha" className="icone-do-input" />
              <input
                type={senhaVisivelLogin ? "text" : "password"}
                id="campo-senha"
                className="campo-de-entrada"
                placeholder="Digite sua senha"
                value={senhaLogin}
                onChange={(event) => setSenhaLogin(event.target.value)}
              />
              <button
                type="button"
                className="botao-de-visibilidade"
                onClick={alternarVisibilidadeSenhaLogin}
                aria-label={senhaVisivelLogin ? "Ocultar senha" : "Mostrar senha"}
              >
                <img 
                  src="/IconeOcultar.png" 
                  alt={senhaVisivelLogin ? "Ocultar senha" : "Mostrar senha"} 
                  className="icone-botao-senha"
                />
              </button>
            </div>
          </div>

          {/* Mensagem de erro */}
          {mensagemErroLogin && <div className="mensagem-de-erro">{mensagemErroLogin}</div>}

          {/* Opções */}
          <div className="linha-das-opcoes">
            <label className="rotulo-da-checkbox">
              <input
                type="checkbox"
                className="checkbox"
                checked={lembrarCredenciais}
                onChange={(event) => setLembrarCredenciais(event.target.checked)}
              />
              <span className="texto-da-checkbox">Lembrar credenciais</span>
            </label>
            <a href="#" className="link-esqueci-senha">
              Esqueci minha senha
            </a>
          </div>

          {/* Botão de entrar */}
          <button type="submit" className="botao-de-entrar">
            Entrar
          </button>

          {/* Divisor */}
          <div className="divisor">
            <span className="texto-do-divisor">ou</span>
          </div>

          {/* Link para criar conta */}
          <p className="texto-do-cadastro">
            Não possui uma conta?
            <span className="link-do-cadastro" onClick={() => irParaPagina('criar-conta')}> Criar conta</span>
          </p>
        </form>
      </>
    );
  }

  // ==========================================
  // RENDERIZAÇÃO DA PÁGINA DE CRIAR CONTA
  // ==========================================
  function renderizarPaginaCriarConta() {
    return (
      <>
        {/* Títulos */}
        <h1 className="titulo-principal">Criar conta</h1>
        <p className="subtitulo">Cadastre-se para acessar o sistema</p>

        {/* Formulário de criar conta */}
        <form className="formulario" onSubmit={quandoEnviarCriarConta}>
          
          {/* Campo de nome completo */}
          <div className="grupo-do-campo">
            <label className="rotulo-do-campo" htmlFor="campo-nome">
              Nome completo
            </label>
            <div className="wrapper-do-input">
              <img src="/UsuarioIcone.png" alt="Ícone de usuário" className="icone-do-input" />
              <input
                type="text"
                id="campo-nome"
                className="campo-de-entrada"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </div>
          </div>

          {/* Campo de e-mail */}
          <div className="grupo-do-campo">
            <label className="rotulo-do-campo" htmlFor="campo-email-criar">
              E-mail
            </label>
            <div className="wrapper-do-input">
              <img src="/IconeEmail.png" alt="E-mail" className="icone-do-input-email" />
              <input
                type="email"
                id="campo-email-criar"
                className="campo-de-entrada"
                placeholder="Digite seu e-mail"
                value={emailCriar}
                onChange={(event) => setEmailCriar(event.target.value)}
              />
            </div>
          </div>

          {/* Campo de senha */}
          <div className="grupo-do-campo">
            <label className="rotulo-do-campo" htmlFor="campo-senha-criar">
              Senha
            </label>
            <div className="wrapper-do-input">
              <img src="/IconeSenha.png" alt="Senha" className="icone-do-input" />
              <input
                type={senhaVisivelCriar ? "text" : "password"}
                id="campo-senha-criar"
                className="campo-de-entrada"
                placeholder="Digite sua senha"
                value={senhaCriar}
                onChange={(event) => setSenhaCriar(event.target.value)}
              />
              <button
                type="button"
                className="botao-de-visibilidade"
                onClick={alternarVisibilidadeSenhaCriar}
                aria-label={senhaVisivelCriar ? "Ocultar senha" : "Mostrar senha"}
              >
                <img 
                  src="/IconeOcultar.png" 
                  alt={senhaVisivelCriar ? "Ocultar senha" : "Mostrar senha"} 
                  className="icone-botao-senha"
                />
              </button>
            </div>
          </div>

          {/* Campo de confirmar senha */}
          <div className="grupo-do-campo">
            <label className="rotulo-do-campo" htmlFor="campo-confirmar-senha">
              Confirmar senha
            </label>
            <div className="wrapper-do-input">
              <img src="/IconeSenha.png" alt="Confirmar senha" className="icone-do-input" />
              <input
                type={senhaVisivelConfirmar ? "text" : "password"}
                id="campo-confirmar-senha"
                className="campo-de-entrada"
                placeholder="Confirme sua senha"
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
              />
              <button
                type="button"
                className="botao-de-visibilidade"
                onClick={alternarVisibilidadeConfirmarSenha}
                aria-label={senhaVisivelConfirmar ? "Ocultar senha" : "Mostrar senha"}
              >
                <img 
                  src="/IconeOcultar.png" 
                  alt={senhaVisivelConfirmar ? "Ocultar senha" : "Mostrar senha"} 
                  className="icone-botao-senha"
                />
              </button>
            </div>
          </div>

          {/* Mensagem de erro */}
          {mensagemErroCriar && <div className="mensagem-de-erro">{mensagemErroCriar}</div>}

          {/* Botão de criar conta */}
          <button type="submit" className="botao-de-entrar">
            Criar conta
          </button>

          {/* Divisor */}
          <div className="divisor">
            <span className="texto-do-divisor">ou</span>
          </div>

          {/* Link para voltar ao login */}
          <p className="texto-do-cadastro">
            Já possui uma conta?
            <span className="link-do-cadastro" onClick={() => irParaPagina('login')}> Entrar</span>
          </p>
        </form>
      </>
    );
  }

  // ==========================================
  // RENDERIZAÇÃO PRINCIPAL
  // ==========================================
  return (
    <div className="container-da-pagina">
      <div className="card-de-login">
        
        {/* Logo da aplicação */}
        <div className="container-do-logo">
          <img src="/LogoTeste.png" alt="Logo do sistema" className="logo" />
        </div>

        {/* Renderiza a página atual */}
        {paginaAtual === 'login' ? renderizarPaginaLogin() : renderizarPaginaCriarConta()}

      </div>
    </div>
  );
}

// Exportamos o componente
export default Login;
