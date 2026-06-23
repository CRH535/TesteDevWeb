// arquivo Login.jsx
// aqui fica toda a tela de login e cadastro da aplicação

// importo o hook useState pra controlar os dados digitados e o estado da tela
import { useState } from "react";

// importo o css responsável pelo visual do formulário
import "./Login.css";

// importo as funções de autenticação
// nesse projeto não existe chamada de API real:
// o login e o cadastro usam funções locais que salvam e leem dados do localStorage
import { login, cadastrar } from "./AuthContext.jsx";

// importo o helper pra montar caminhos corretos de assets públicos no deploy
import { pegarAssetPublico } from "./utils/publicAsset.js";

// função pra validar se o email parece válido
// a validação aqui é simples e só confere se existe "@" e "." depois dele
function checarEmail(email) {
  // se não tiver arroba, já considero inválido
  if (email.indexOf("@") === -1) return false;

  // descubro em que posição está a arroba
  const posArroba = email.indexOf("@");

  // pego só a parte depois da arroba
  const parteDepois = email.substring(posArroba);

  // se depois da arroba não tiver ponto, também considero inválido
  if (parteDepois.indexOf(".") === -1) return false;

  // se passou pelas regras acima, o email é aceito
  return true;
}

// função pra validar a senha do cadastro
// a regra usada é:
// pelo menos 8 caracteres, com no mínimo uma letra e um número
function checarSenha(senha) {
  // a primeira regra é o tamanho mínimo
  if (senha.length < 8) return false;

  // essa variável guarda se encontrei alguma letra na senha
  let temLetra = false;

  // percorro todos os caracteres procurando letras maiúsculas ou minúsculas
  for (let i = 0; i < senha.length; i++) {
    const char = senha.charAt(i);
    if ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z")) {
      temLetra = true;
    }
  }

  // essa variável guarda se encontrei algum número
  let temNumero = false;

  // percorro novamente a senha procurando dígitos
  for (let j = 0; j < senha.length; j++) {
    const char2 = senha.charAt(j);
    if (char2 >= "0" && char2 <= "9") {
      temNumero = true;
    }
  }

  // a senha só é aceita se tiver letra e número ao mesmo tempo
  return temLetra && temNumero;
}

// componente principal da tela de autenticação
// ele recebe a função trocarPagina pra avisar ao componente pai quando deve ir pra home
function Login(props) {
  // pego a função enviada por props
  const trocarPagina = props.trocarPagina;

  // monto os caminhos dos assets públicos
  // assim as imagens continuam funcionando em produção no GitHub Pages
  const logoDaAplicacao = pegarAssetPublico("LogoTeste.png");
  const iconeEmail = pegarAssetPublico("IconeEmail.png");
  const iconeSenha = pegarAssetPublico("IconeSenha.png");
  const iconeOcultar = pegarAssetPublico("IconeOcultar.png");
  const iconeUsuario = pegarAssetPublico("UsuarioIcone.png");

  // estados do formulário de login
  // guardam os valores digitados no acesso à conta
  const [campoEmail, setarEmail] = useState("");
  const [campoSenha, setarSenha] = useState("");
  const [mostrarSenha, setarMostrarSenha] = useState(false);

  // estados do formulário de cadastro
  // guardam nome, email, senha e confirmação da nova conta
  const [campoNome, setarNome] = useState("");
  const [campoEmailCadastro, setarEmailCadastro] = useState("");
  const [campoSenhaCadastro, setarSenhaCadastro] = useState("");
  const [campoConfirmarSenha, setarConfirmarSenha] = useState("");
  const [mostrarSenhaCadastro, setarMostrarSenhaCadastro] = useState(false);
  const [mostrarConfirmarSenha, setarMostrarConfirmarSenha] = useState(false);

  // estados de feedback visual
  // um mostra erros de validação ou autenticação
  // o outro mostra mensagens positivas, como sucesso no cadastro
  const [mensagemErro, setarMensagemErro] = useState("");
  const [mensagemSucesso, setarMensagemSucesso] = useState("");

  // esse estado controla qual tela será mostrada dentro do mesmo componente
  // "login" mostra o formulário de entrada e "cadastro" mostra o formulário de criação de conta
  const [pagina, setarPagina] = useState("login");

  // função chamada ao clicar no botão de entrar
  // ela impede o submit padrão, valida os campos e tenta autenticar o usuário
  function botaoEntrar(evento) {
    // evito recarregar a página ao clicar no botão
    evento.preventDefault();

    // antes de validar, limpo mensagens antigas
    setarMensagemErro("");
    setarMensagemSucesso("");

    // verifico se o email foi preenchido
    if (campoEmail === "") {
      setarMensagemErro("Por favor, digite seu e-mail!");
      return;
    }

    // valido o formato básico do email
    if (!checarEmail(campoEmail)) {
      setarMensagemErro("Por favor, digite um e-mail válido!");
      return;
    }

    // verifico se a senha foi informada
    if (campoSenha === "") {
      setarMensagemErro("Por favor, digite sua senha!");
      return;
    }

    // faço a tentativa de login
    // essa chamada não é uma API externa:
    // ela usa a função importada de AuthContext, que consulta os dados salvos localmente
    const resultado = login(campoEmail, campoSenha);

    // se der erro, mostro a mensagem retornada pela autenticação
    if (!resultado.sucesso) {
      setarMensagemErro(resultado.erro);
    } else {
      // se der certo, aviso o componente pai pra trocar para a home
      trocarPagina("home");
    }
  }

  // função chamada ao clicar no botão de criar conta
  // aqui acontece toda a validação dos dados do cadastro antes de salvar o usuário
  function botaoCadastrar(evento) {
    // evito o comportamento padrão do formulário
    evento.preventDefault();

    // começo limpando mensagens antigas pra exibir só o resultado atual
    setarMensagemErro("");
    setarMensagemSucesso("");

    // nome é obrigatório
    if (campoNome === "") {
      setarMensagemErro("Por favor, digite seu nome!");
      return;
    }

    // email também é obrigatório
    if (campoEmailCadastro === "") {
      setarMensagemErro("Por favor, digite seu e-mail!");
      return;
    }

    // confiro o formato mínimo do email informado
    if (!checarEmail(campoEmailCadastro)) {
      setarMensagemErro("Por favor, digite um e-mail válido!");
      return;
    }

    // senha não pode ficar vazia
    if (campoSenhaCadastro === "") {
      setarMensagemErro("Por favor, digite sua senha!");
      return;
    }

    // a senha precisa obedecer às regras definidas na função checarSenha
    if (!checarSenha(campoSenhaCadastro)) {
      setarMensagemErro(
        "A senha precisa ter pelo menos 8 caracteres, com letra e número!",
      );
      return;
    }

    // a confirmação também é obrigatória
    if (campoConfirmarSenha === "") {
      setarMensagemErro("Por favor, confirme sua senha!");
      return;
    }

    // comparo os dois campos pra garantir que a senha foi digitada igual
    if (campoSenhaCadastro !== campoConfirmarSenha) {
      setarMensagemErro("As senhas não são iguais!");
      return;
    }

    // faço o cadastro do usuário
    // assim como no login, aqui não existe requisição de API:
    // a função cadastrar salva os dados localmente no navegador
    const resultadoCadastro = cadastrar(
      campoNome,
      campoEmailCadastro,
      campoSenhaCadastro,
    );

    // se a função retornar erro, exibo a mensagem na interface
    if (!resultadoCadastro.sucesso) {
      setarMensagemErro(resultadoCadastro.erro);
    } else {
      // se deu certo, limpo todos os campos pra evitar dados antigos na tela
      setarEmail("");
      setarSenha("");
      setarNome("");
      setarEmailCadastro("");
      setarSenhaCadastro("");
      setarConfirmarSenha("");

      // mostro uma mensagem positiva orientando o próximo passo
      setarMensagemSucesso("Conta criada com sucesso! Agora faça login.");

      // depois de 2 segundos, volto automaticamente pra tela de login
      // também removo a mensagem de sucesso pra deixar a tela limpa
      setTimeout(() => {
        setarPagina("login");
        setarMensagemSucesso("");
      }, 2000);
    }
  }

  // função pra alternar entre mostrar e esconder a senha do login
  function toggleSenha() {
    setarMostrarSenha(!mostrarSenha);
  }

  // função pra alternar a visibilidade da senha no cadastro
  function toggleSenhaCadastro() {
    setarMostrarSenhaCadastro(!mostrarSenhaCadastro);
  }

  // função pra alternar a visibilidade do campo confirmar senha
  function toggleConfirmarSenha() {
    setarMostrarConfirmarSenha(!mostrarConfirmarSenha);
  }

  // troca a tela atual para o formulário de cadastro
  // junto com isso, limpa mensagens antigas pra não carregar erro ou sucesso da tela anterior
  function irPraCadastro() {
    setarPagina("cadastro");
    setarMensagemErro("");
    setarMensagemSucesso("");
  }

  // volta da tela de cadastro para a tela de login
  // também limpa mensagens pra garantir uma experiência mais clara
  function irPraLogin() {
    setarPagina("login");
    setarMensagemErro("");
    setarMensagemSucesso("");
  }

  // se a tela atual for "login", renderizo o formulário de entrada
  if (pagina === "login") {
    return (
      <div className="container-da-pagina">
        <div className="card-de-login">
          {/* área do logo exibida no topo do card */}
          <div className="container-do-logo">
            <img src={logoDaAplicacao} alt="Logo" className="logo" />
          </div>

          {/* título e subtítulo que orientam o usuário sobre a ação atual */}
          <h1 className="titulo-principal">Entrar</h1>
          <p className="subtitulo">Acesse sua conta</p>

          {/* formulário visual de login
              os botões usam type="button", então a ação é controlada manualmente pelas funções acima */}
          <form className="formulario">
            {/* campo de email do login */}
            <div className="grupo-do-campo">
              <label className="rotulo-do-campo" htmlFor="campo-email">
                E-mail
              </label>
              <div className="wrapper-do-input">
                <img
                  src={iconeEmail}
                  alt="Email"
                  className="icone-do-input-email"
                />
                <input
                  type="text"
                  id="campo-email"
                  className="campo-de-entrada"
                  placeholder="Digite seu e-mail"
                  value={campoEmail}
                  // atualizo o estado sempre que o usuário digita
                  onChange={(e) => setarEmail(e.target.value)}
                />
              </div>
            </div>

            {/* campo de senha do login com botão pra alternar visibilidade */}
            <div className="grupo-do-campo">
              <label className="rotulo-do-campo" htmlFor="campo-senha">
                Senha
              </label>
              <div className="wrapper-do-input">
                <img src={iconeSenha} alt="Senha" className="icone-do-input" />
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="campo-senha"
                  className="campo-de-entrada"
                  placeholder="Digite sua senha"
                  value={campoSenha}
                  // salvo no estado o valor atual da senha
                  onChange={(e) => setarSenha(e.target.value)}
                />
                <button
                  type="button"
                  className="botao-de-visibilidade"
                  // esse clique só alterna o tipo do input entre texto e senha
                  onClick={toggleSenha}
                >
                  <img
                    src={iconeOcultar}
                    alt="Mostrar senha"
                    className="icone-botao-senha"
                  />
                </button>
              </div>
            </div>

            {/* mensagem de erro aparece só quando existe texto salvo no estado */}
            {mensagemErro && (
              <div className="mensagem-de-erro">{mensagemErro}</div>
            )}

            {/* mensagem de sucesso também é condicional */}
            {mensagemSucesso && (
              <div className="mensagem-de-sucesso">{mensagemSucesso}</div>
            )}

            {/* botão principal que dispara a lógica de login */}
            <button
              type="button"
              className="botao-de-entrar"
              onClick={botaoEntrar}
            >
              Entrar
            </button>

            {/* divisor visual entre a ação principal e o link de navegação */}
            <div className="divisor">
              <span className="texto-do-divisor">ou</span>
            </div>

            {/* link visual pra trocar para a tela de cadastro sem sair do componente */}
            <p className="texto-do-cadastro">
              Não tem conta?{" "}
              <span className="link-do-cadastro" onClick={irPraCadastro}>
                Criar conta
              </span>
            </p>
          </form>
        </div>
      </div>
    );
  } else {
    // se a tela atual não for login, renderizo a versão de cadastro
    return (
      <div className="container-da-pagina">
        <div className="card-de-login">
          {/* logo no topo do card */}
          <div className="container-do-logo">
            <img src={logoDaAplicacao} alt="Logo" className="logo" />
          </div>

          {/* título e subtítulo específicos da criação de conta */}
          <h1 className="titulo-principal">Criar conta</h1>
          <p className="subtitulo">Cadastre-se agora</p>

          {/* formulário de cadastro
              todos os campos aqui atualizam estados independentes do formulário de login */}
          <form className="formulario">
            {/* campo do nome completo */}
            <div className="grupo-do-campo">
              <label className="rotulo-do-campo" htmlFor="campo-nome">
                Nome completo
              </label>
              <div className="wrapper-do-input">
                <img
                  src={iconeUsuario}
                  alt="Usuário"
                  className="icone-do-input"
                />
                <input
                  type="text"
                  id="campo-nome"
                  className="campo-de-entrada"
                  placeholder="Digite seu nome"
                  value={campoNome}
                  // salvo o nome digitado no estado correspondente
                  onChange={(e) => setarNome(e.target.value)}
                />
              </div>
            </div>

            {/* campo de email do cadastro */}
            <div className="grupo-do-campo">
              <label className="rotulo-do-campo" htmlFor="campo-email-cadastro">
                E-mail
              </label>
              <div className="wrapper-do-input">
                <img
                  src={iconeEmail}
                  alt="Email"
                  className="icone-do-input-email"
                />
                <input
                  type="email"
                  id="campo-email-cadastro"
                  className="campo-de-entrada"
                  placeholder="Digite seu e-mail"
                  value={campoEmailCadastro}
                  // mantenho o email de cadastro sincronizado com o estado
                  onChange={(e) => setarEmailCadastro(e.target.value)}
                />
              </div>
            </div>

            {/* campo de senha principal do cadastro */}
            <div className="grupo-do-campo">
              <label className="rotulo-do-campo" htmlFor="campo-senha-cadastro">
                Senha
              </label>
              <div className="wrapper-do-input">
                <img src={iconeSenha} alt="Senha" className="icone-do-input" />
                <input
                  type={mostrarSenhaCadastro ? "text" : "password"}
                  id="campo-senha-cadastro"
                  className="campo-de-entrada"
                  placeholder="Digite sua senha"
                  value={campoSenhaCadastro}
                  // guardo a senha do cadastro em um estado separado do login
                  onChange={(e) => setarSenhaCadastro(e.target.value)}
                />
                <button
                  type="button"
                  className="botao-de-visibilidade"
                  // alterno se a senha fica visível ou mascarada
                  onClick={toggleSenhaCadastro}
                >
                  <img
                    src={iconeOcultar}
                    alt="Mostrar senha"
                    className="icone-botao-senha"
                  />
                </button>
              </div>
            </div>

            {/* campo para confirmar a senha digitada acima */}
            <div className="grupo-do-campo">
              <label
                className="rotulo-do-campo"
                htmlFor="campo-confirmar-senha"
              >
                Confirmar senha
              </label>
              <div className="wrapper-do-input">
                <img
                  src={iconeSenha}
                  alt="Confirmar"
                  className="icone-do-input"
                />
                <input
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  id="campo-confirmar-senha"
                  className="campo-de-entrada"
                  placeholder="Confirme sua senha"
                  value={campoConfirmarSenha}
                  // salvo a confirmação da senha pra comparar na validação
                  onChange={(e) => setarConfirmarSenha(e.target.value)}
                />
                <button
                  type="button"
                  className="botao-de-visibilidade"
                  // alterno a visualização do campo de confirmação
                  onClick={toggleConfirmarSenha}
                >
                  <img
                    src={iconeOcultar}
                    alt="Mostrar senha"
                    className="icone-botao-senha"
                  />
                </button>
              </div>
            </div>

            {/* mensagens condicionais de erro e sucesso */}
            {mensagemErro && (
              <div className="mensagem-de-erro">{mensagemErro}</div>
            )}
            {mensagemSucesso && (
              <div className="mensagem-de-sucesso">{mensagemSucesso}</div>
            )}

            {/* botão principal que executa toda a validação e o cadastro */}
            <button
              type="button"
              className="botao-de-entrar"
              onClick={botaoCadastrar}
            >
              Criar conta
            </button>

            {/* divisor visual */}
            <div className="divisor">
              <span className="texto-do-divisor">ou</span>
            </div>

            {/* link pra voltar ao formulário de login */}
            <p className="texto-do-cadastro">
              Já tem conta?{" "}
              <span className="link-do-cadastro" onClick={irPraLogin}>
                Fazer login
              </span>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

// exporto o componente pra ele poder ser usado em outros arquivos
export default Login;
