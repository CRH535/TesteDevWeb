// arquivo auth.js
// aqui eu guardo as funções de autenticação

// variáveis globais pra salvar o estado do usuário
var usuarioAtual = null
var estaLogado = false

// função pra fazer hash da senha
// isso serve pra criptografar a senha um pouco
function fazerHashDaSenha(senha) {
    var hash = 0
    for (var i = 0; i < senha.length; i++) {
        var letra = senha.charCodeAt(i)
        hash = ((hash << 5) - hash) + letra
        hash = hash & hash
    }
    return 'hash_' + Math.abs(hash).toString(16)
}

// função pra criar a sessão do usuário
function criarSessao(dadosUsuario) {
    // salvo os dados no localStorage
    // localStorage é tipo uma memória do navegador
    var sessao = {
        id: dadosUsuario.id,
        nome: dadosUsuario.nome,
        email: dadosUsuario.email,
        horario: Date.now()
    }
    
    localStorage.setItem('sessao_usuario', JSON.stringify(sessao))
    usuarioAtual = sessao
    estaLogado = true
}

// função pra pegar o usuário que está logado
function pegarUsuarioLogado() {
    // primeiro verifico se tem sessão salva
    var sessaoStr = localStorage.getItem('sessao_usuario')
    
    if (sessaoStr) {
        // se tem, transformo em objeto
        var sessao = JSON.parse(sessaoStr)
        usuarioAtual = sessao
        estaLogado = true
        return sessao
    } else {
        // se não tem, usuário não está logado
        usuarioAtual = null
        estaLogado = false
        return null
    }
}

// função pra cadastrar um novo usuário
function cadastrar(nome, email, senha) {
    // pego a lista de usuários do localStorage
    var usuariosStr = localStorage.getItem('lista_usuarios')
    var listaUsuarios = []
    
    if (usuariosStr) {
        // se já tem usuários,transformo em lista
        listaUsuarios = JSON.parse(usuariosStr)
    }
    
    // verifico se o email já está cadastrado
    // uso um loop simples pra isso
    for (var j = 0; j < listaUsuarios.length; j++) {
        if (listaUsuarios[j].email === email) {
            // se entrou aqui, email já existe
            return { sucesso: false, erro: 'Este e-mail já está cadastrado!' }
        }
    }
    
    // crio o objeto do novo usuário
    var novoUsuario = {
        id: Date.now(),
        nome: nome,
        email: email,
        senha: fazerHashDaSenha(senha)
    }
    
    // adiciono na lista
    listaUsuarios.push(novoUsuario)
    
    // salvo a lista atualizada no localStorage
    localStorage.setItem('lista_usuarios', JSON.stringify(listaUsuarios))
    
    return { sucesso: true, erro: '' }
}

// função pra fazer login
function login(email, senha) {
    // pego a lista de usuários
    var usuariosStr = localStorage.getItem('lista_usuarios')
    
    if (!usuariosStr) {
        return { sucesso: false, erro: 'Nenhum usuário cadastrado!' }
    }
    
    var listaUsuarios = JSON.parse(usuariosStr)
    
    // procuro o usuário pelo email
    for (var k = 0; k < listaUsuarios.length; k++) {
        if (listaUsuarios[k].email === email) {
            // achei o email, agora verifico a senha
            if (listaUsuarios[k].senha === fazerHashDaSenha(senha)) {
                // senha certa! crio a sessão
                criarSessao({
                    id: listaUsuarios[k].id,
                    nome: listaUsuarios[k].nome,
                    email: listaUsuarios[k].email
                })
                return { sucesso: true, erro: '' }
            } else {
                return { sucesso: false, erro: 'Senha incorreta!' }
            }
        }
    }
    
    // se chegou aqui, não encontrou o email
    return { sucesso: false, erro: 'Usuário não encontrado!' }
}

// função pra fazer logout
function logout() {
    // removo a sessão do localStorage
    localStorage.removeItem('sessao_usuario')
    usuarioAtual = null
    estaLogado = false
}

// função pra verificar se está logado
function verificarEstaLogado() {
    return estaLogado
}

// função pra pegar o usuário atual
function pegarUsuarioAtual() {
    return usuarioAtual
}

// exporto todas as funções
// assim posso usar elas em outros arquivos
export {
    cadastrar,
    login,
    logout,
    verificarEstaLogado,
    pegarUsuarioAtual,
    criarSessao,
    pegarUsuarioLogado,
    fazerHashDaSenha
}
