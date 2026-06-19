// Importamos o React e o hook useState (para gerenciar estados)
import { useState } from 'react';
// Importamos o arquivo de estilos
import './App.css';

// Este é o componente principal da nossa página de login
function App() {
  // ==========================================
  // ESTADOS: são variáveis que guardam informações que mudam
  // ==========================================
  
  // Estado para guardar o e-mail/usuário digitado
  const [email, setEmail] = useState('');
  
  // Estado para guardar a senha digitada
  const [senha, setSenha] = useState('');
  
  // Estado para controlar se a senha está visível ou não
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  
  // Estado para controlar se a checkbox "lembrar credenciais" está marcada
  const [lembrarCredenciais, setLembrarCredenciais] = useState(false);
  
  // Estado para guardar mensagens de erro
  const [mensagemErro, setMensagemErro] = useState('');

  // ==========================================
  // FUNÇÕES: são blocos de código que fazem algo específico
  // ==========================================

  // Esta função é chamada quando o formulário é enviado
  function quandoEnviarFormulario(event) {
    // Previne que a página recarregue (comportamento padrão do formulário)
    event.preventDefault();
    
    // Limpa qualquer mensagem de erro anterior
    setMensagemErro('');

    // Verifica se o e-mail está vazio
    if (email.trim() === '') {
      setMensagemErro('Por favor, digite seu e-mail ou usuário!');
      return; // Para a função aqui se houver erro
    }

    // Verifica se a senha está vazia
    if (senha.trim() === '') {
      setMensagemErro('Por favor, digite sua senha!');
      return; // Para a função aqui se houver erro
    }

    // Se tudo estiver ok, mostra as informações no console (ferramenta do navegador)
    console.log('=== Dados do Login ===');
    console.log('E-mail/Usuário:', email);
    console.log('Senha:', senha);
    console.log('Lembrar credenciais:', lembrarCredenciais ? 'Sim' : 'Não');

    // Mostra um alerta para o usuário
    alert('Login enviado! Verifique o console do navegador (F12) para ver os dados.');
  }

  // Esta função alterna a visibilidade da senha
  function alternarVisibilidadeSenha() {
    setSenhaVisivel(!senhaVisivel); // Inverte o valor (se era true, vira false e vice-versa)
  }

  // Esta função atualiza o estado da checkbox "lembrar credenciais"
  function quandoMudarCheckbox(event) {
    setLembrarCredenciais(event.target.checked);
  }

  // ==========================================
  // RENDERIZAÇÃO: o que aparece na tela
  // ==========================================
  return (
    <div className="container-da-pagina">
      <div className="card-de-login">
        
        {/* Logo da aplicação */}
        <div className="container-do-logo">
          <img src="./LogoTeste.png" alt="Logo do sistema" className="logo" />
        </div>

        {/* Títulos */}
        <h1 className="titulo-principal">Entrar</h1>
        <p className="subtitulo">Acesse sua conta para continuar</p>

        {/* Formulário de login */}
        <form className="formulario" onSubmit={quandoEnviarFormulario}>
          
          {/* Campo de e-mail/usuário */}
          <div className="grupo-do-campo">
            <label className="rotulo-do-campo" htmlFor="campo-email">
              E-mail ou usuário
            </label>
            <div className="wrapper-do-input">
              {/* Ícone do e-mail usando a imagem PNG */}
              <img src="/IconeEmail.png" alt="E-mail" className="icone-do-input-email" />
              
              <input
                type="text"
                id="campo-email"
                className="campo-de-entrada"
                placeholder="Digite seu e-mail ou usuário"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          {/* Campo de senha */}
          <div className="grupo-do-campo">
            <label className="rotulo-do-campo" htmlFor="campo-senha">
              Senha
            </label>
            <div className="wrapper-do-input">
              {/* Ícone da senha usando a imagem PNG */}
              <img src="/IconeSenha.png" alt="Senha" className="icone-do-input" />
              
              <input
                type={senhaVisivel ? "text" : "password"}
                id="campo-senha"
                className="campo-de-entrada"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
              
              {/* Botão para mostrar/ocultar senha usando a imagem fornecida */}
              <button
                type="button"
                className="botao-de-visibilidade"
                onClick={alternarVisibilidadeSenha}
                aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
              >
                <img 
                  src="/IconeOcultar.png" 
                  alt={senhaVisivel ? "Ocultar senha" : "Mostrar senha"} 
                  className="icone-botao-senha"
                />
              </button>
            </div>
          </div>

          {/* Mensagem de erro, se houver */}
          {mensagemErro && <div className="mensagem-de-erro">{mensagemErro}</div>}

          {/* Opções (lembrar credenciais + esqueci a senha) */}
          <div className="linha-das-opcoes">
            <label className="rotulo-da-checkbox">
              <input
                type="checkbox"
                className="checkbox"
                checked={lembrarCredenciais}
                onChange={quandoMudarCheckbox}
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

          {/* Divisor "ou" */}
          <div className="divisor">
            <span className="texto-do-divisor">ou</span>
          </div>

          {/* Link para criar conta */}
          <p className="texto-do-cadastro">
            Não possui uma conta?
            <a href="#" className="link-do-cadastro"> Criar conta</a>
          </p>
        </form>
      </div>
    </div>
  );
}

// Exportamos o componente para que o React possa usá-lo
export default App;
