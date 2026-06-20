// arquivo home.jsx
// esta é a página inicial que só aparece pra quem tá logado

import React from 'react'

// importo o css da home
import './Home.css'

// importo as funções de auth
import { logout, pegarUsuarioLogado } from './AuthContext.jsx'

// componente da página home
// agora ele recebe a função trocarPagina como propriedade
function Home(props) {
    // pegamos a função trocarPagina das propriedades
    var trocarPagina = props.trocarPagina
    
    // pego os dados do usuário logado
    var usuario = pegarUsuarioLogado()
    
    // função pra quando clicar em sair
    function botaoSair() {
        // faço o logout
        logout()
        // vou pra página de login
        trocarPagina('login')
    }
    
    // se não tiver usuário (não deveria acontecer mas por segurança)
    if (!usuario) {
        return (
            <div className="home-container">
                <h1>Erro! Você não está logado.</h1>
                <button onClick={() => trocarPagina('login')}>
                    Ir pra Login
                </button>
            </div>
        )
    }
    
    // aqui mostro a página normal da home
    return (
        <div className="home-container">
            <div className="home-content">
                
                {/* Logo no topo */}
                <div className="home-logo-container">
                    <img src="/LogoTeste.png" alt="Logo" className="home-logo" />
                </div>
                
                {/* Título de boas vindas */}
                <h1 className="home-welcome-title">
                    Bem-vindo, {usuario.nome}!
                </h1>
                
                {/* Subtítulo */}
                <p className="home-welcome-subtitle">
                    Estamos felizes por você estar aqui.
                </p>
                
                {/* Informações do usuário */}
                <div className="home-user-info">
                    <div className="home-user-icon">
                        👤
                    </div>
                    <div className="home-user-details">
                        {/* Mostro o nome e email do usuário */}
                        <p className="home-user-name">{usuario.nome}</p>
                        <p className="home-user-email">{usuario.email}</p>
                    </div>
                </div>
                
                {/* Botão pra sair */}
                <button className="home-logout-button" onClick={botaoSair}>
                    Sair da conta
                </button>
                
                {/* Aviso de que o site ainda tá em desenvolvimento */}
                <div className="home-development-warning">
                    <div className="home-warning-icon">
                        ⚠️
                    </div>
                    <h2 className="home-warning-title">
                        Plataforma em Desenvolvimento
                    </h2>
                    <p className="home-warning-text">
                        Esta plataforma ainda se encontra em fase de desenvolvimento ativo. 
                        No momento, não estão implementadas funcionalidades de venda, cadastro de anúncios 
                        ou qualquer outra funcionalidade comercial.
                    </p>
                </div>
                
            </div>
        </div>
    )
}

// exporto o componente
export default Home
