import React, { useState } from 'react';
import './Login.css';
import { login, cadastrar } from './AuthContext.jsx';

function checarEmail(email) {
  if (email.indexOf('@') === -1) return false;
  const posArroba = email.indexOf('@');
  const parteDepois = email.substring(posArroba);
  if (parteDepois.indexOf('.') === -1) return false;
  return true;
}

function checarSenha(senha) {
  if (senha.length < 8) return false;
  let temLetra = false;
  for (let i = 0; i < senha.length; i++) {
    const char = senha.charAt(i);
    if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
      temLetra = true;
    }
  }
  let temNumero = false;
  for (let j = 0; j < senha.length; j++) {
    const char2 = senha.charAt(j);
    if (char2 >= '0' && char2 <= '9') {
      temNumero = true;
    }
  }
  return temLetra && temNumero;
}

function Login(props) {
  const trocarPagina = props.trocarPagina;
  const [campoEmail, setarEmail] = useState('');
  const [campoSenha, setarSenha] = useState('');
  const [mostrarSenha, setarMostrarSenha] = useState(false);
  const [campoNome, setarNome] = useState('');
  const [campoEmailCadastro, setarEmailCadastro] = useState('');
  const [campoSenhaCadastro, setarSenhaCadastro] = useState('');
  const [campoConfirmarSenha, setarConfirmarSenha] = useState('');
  const [mostrarSenhaCadastro, setarMostrarSenhaCadastro] = useState(false);
  const [mostrarConfirmarSenha, setarMostrarConfirmarSenha] = useState(false);
  const [mensagemErro, setarMensagemErro] = useState('');
  const [pagina, setarPagina] = useState('login');

  function botaoEntrar(evento) {
    evento.preventDefault();
    setarMensagemErro('');
    if (campoEmail === '') { setarMensagemErro('Por favor, digite seu e-mail!'); return; }
    if (!checarEmail(campoEmail)) { setarMensagemErro('Por favor, digite um e-mail válido!'); return; }
    if (campoSenha === '') { setarMensagemErro('Por favor, digite sua senha!'); return; }
    const resultado = login(campoEmail, campoSenha);
    if (!resultado.sucesso) {
      setarMensagemErro(resultado.erro);
    } else {
      trocarPagina('home');
    }
  }

  function botaoCadastrar(evento) {
    evento.preventDefault();
    setarMensagemErro('');
    if (campoNome === '') { setarMensagemErro('Por favor, digite seu nome!'); return; }
    if (campoEmailCadastro === '') { setarMensagemErro('Por favor, digite seu e-mail!'); return; }
    if (!checarEmail(campoEmailCadastro)) { setarMensagemErro('Por favor, digite um e-mail válido!'); return; }
    if (campoSenhaCadastro === '') { setarMensagemErro('Por favor, digite sua senha!'); return; }
    if (!checarSenha(campoSenhaCadastro)) { setarMensagemErro('A senha precisa ter pelo menos 8 caracteres, com letra e número!'); return; }
    if (campoConfirmarSenha === '') { setarMensagemErro('Por favor, confirme sua senha!'); return; }
    if (campoSenhaCadastro !== campoConfirmarSenha) { setarMensagemErro('As senhas não são iguais!'); return; }
    const resultadoCadastro = cadastrar(campoNome, campoEmailCadastro, campoSenhaCadastro);
    if (!resultadoCadastro.sucesso) {
      setarMensagemErro(resultadoCadastro.erro);
    } else {
      setarEmail('');
      setarSenha('');
      setarNome('');
      setarEmailCadastro('');
      setarSenhaCadastro('');
      setarConfirmarSenha('');
      setarMensagemErro('Conta criada com sucesso! Agora faça login.');
      setTimeout(() => { setarPagina('login'); }, 2000);
    }
  }

  function toggleSenha() { setarMostrarSenha(!mostrarSenha); }
  function toggleSenhaCadastro() { setarMostrarSenhaCadastro(!mostrarSenhaCadastro); }
  function toggleConfirmarSenha() { setarMostrarConfirmarSenha(!mostrarConfirmarSenha); }
  function irPraCadastro() { setarPagina('cadastro'); setarMensagemErro(''); }
  function irPraLogin() { setarPagina('login'); setarMensagemErro(''); }

  if (pagina === 'login') {
    return (
      <div className="container-da-pagina">
        <div className="card-de-login">
          <div className="container-do-logo">
            <img src="/LogoTeste.png" alt="Logo" className="logo" />
          </div>
          <h1 className="titulo-principal">Entrar</h1>
          <p className="subtitulo">Acesse sua conta</p>
          <form className="formulario">
            <div className="grupo-do-campo">
              <label className="rotulo-do-campo" htmlFor="campo-email">E-mail</label>
              <div className="wrapper-do-input">
                <img src="/IconeEmail.png" alt="Email" className="icone-do-input-email" />
                <input
                  type="text"
                  id="campo-email"
                  className="campo-de-entrada"
                  placeholder="Digite seu e-mail"
                  value={campoEmail}
                  onChange={(e) => setarEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grupo-do-campo">
              <label className="rotulo-do-campo" htmlFor="campo-senha">Senha</label>
              <div className="wrapper-do-input">
                <img src="/IconeSenha.png" alt="Senha" className="icone-do-input" />
                <input
                  type={mostrarSenha ? "text" : "password"}
                  id="campo-senha"
                  className="campo-de-entrada"
                  placeholder="Digite sua senha"
                  value={campoSenha}
                  onChange={(e) => setarSenha(e.target.value)}
                />
                <button type="button" className="botao-de-visibilidade" onClick={toggleSenha}>
                  <img src="/IconeOcultar.png" alt="Mostrar senha" className="icone-botao-senha" />
                </button>
              </div>
            </div>
            {mensagemErro && <div className="mensagem-de-erro">{mensagemErro}</div>}
            <button type="button" className="botao-de-entrar" onClick={botaoEntrar}>Entrar</button>
            <div className="divisor">
              <span className="texto-do-divisor">ou</span>
            </div>
            <p className="texto-do-cadastro">
              Não tem conta? <span className="link-do-cadastro" onClick={irPraCadastro}>Criar conta</span>
            </p>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-da-pagina">
        <div className="card-de-login">
          <div className="container-do-logo">
            <img src="/LogoTeste.png" alt="Logo" className="logo" />
          </div>
          <h1 className="titulo-principal">Criar conta</h1>
          <p className="subtitulo">Cadastre-se agora</p>
          <form className="formulario">
            <div className="grupo-do-campo">
              <label className="rotulo-do-campo" htmlFor="campo-nome">Nome completo</label>
              <div className="wrapper-do-input">
                <img src="/UsuarioIcone.png" alt="Usuário" className="icone-do-input" />
                <input
                  type="text"
                  id="campo-nome"
                  className="campo-de-entrada"
                  placeholder="Digite seu nome"
                  value={campoNome}
                  onChange={(e) => setarNome(e.target.value)}
                />
              </div>
            </div>
            <div className="grupo-do-campo">
              <label className="rotulo-do-campo" htmlFor="campo-email-cadastro">E-mail</label>
              <div className="wrapper-do-input">
                <img src="/IconeEmail.png" alt="Email" className="icone-do-input-email" />
                <input
                  type="email"
                  id="campo-email-cadastro"
                  className="campo-de-entrada"
                  placeholder="Digite seu e-mail"
                  value={campoEmailCadastro}
                  onChange={(e) => setarEmailCadastro(e.target.value)}
                />
              </div>
            </div>
            <div className="grupo-do-campo">
              <label className="rotulo-do-campo" htmlFor="campo-senha-cadastro">Senha</label>
              <div className="wrapper-do-input">
                <img src="/IconeSenha.png" alt="Senha" className="icone-do-input" />
                <input
                  type={mostrarSenhaCadastro ? "text" : "password"}
                  id="campo-senha-cadastro"
                  className="campo-de-entrada"
                  placeholder="Digite sua senha"
                  value={campoSenhaCadastro}
                  onChange={(e) => setarSenhaCadastro(e.target.value)}
                />
                <button type="button" className="botao-de-visibilidade" onClick={toggleSenhaCadastro}>
                  <img src="/IconeOcultar.png" alt="Mostrar senha" className="icone-botao-senha" />
                </button>
              </div>
            </div>
            <div className="grupo-do-campo">
              <label className="rotulo-do-campo" htmlFor="campo-confirmar-senha">Confirmar senha</label>
              <div className="wrapper-do-input">
                <img src="/IconeSenha.png" alt="Confirmar" className="icone-do-input" />
                <input
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  id="campo-confirmar-senha"
                  className="campo-de-entrada"
                  placeholder="Confirme sua senha"
                  value={campoConfirmarSenha}
                  onChange={(e) => setarConfirmarSenha(e.target.value)}
                />
                <button type="button" className="botao-de-visibilidade" onClick={toggleConfirmarSenha}>
                  <img src="/IconeOcultar.png" alt="Mostrar senha" className="icone-botao-senha" />
                </button>
              </div>
            </div>
            {mensagemErro && <div className="mensagem-de-erro">{mensagemErro}</div>}
            <button type="button" className="botao-de-entrar" onClick={botaoCadastrar}>Criar conta</button>
            <div className="divisor">
              <span className="texto-do-divisor">ou</span>
            </div>
            <p className="texto-do-cadastro">
              Já tem conta? <span className="link-do-cadastro" onClick={irPraLogin}>Fazer login</span>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
