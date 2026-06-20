// arquivo protecao.jsx
// este componente serve pra proteger a página da home
// só deixa entrar se o usuário estiver logado

import React from 'react'

// importo as funções de auth
import { verificarEstaLogado, pegarUsuarioLogado } from './AuthContext.jsx'

// importo o css
import './Home.css'

// componente de proteção
function ProtegerRota(props) {
    // pego as crianças (o componente que vai ser mostrado)
    var componenteFilho = props.children
    
    // verifico se o usuário está logado
    var usuarioLogado = verificarEstaLogado()
    
    // se não estiver logado, mostro mensagem e mando pra login
    if (!usuarioLogado) {
        return (
            <div className="tela-carregamento">
                <h1>Você precisa estar logado!</h1>
                <p>Redirecionando...</p>
                <button onClick={() => window.location.href = '/login'}>
                    Ir pra Login
                </button>
            </div>
        )
    }
    
    // se estiver logado, mostro o componente normal
    return componenteFilho
}

// exporto o componente
export default ProtegerRota
