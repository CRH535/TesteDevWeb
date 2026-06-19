// Script para validação básica do formulário de login

document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Previne o envio padrão do formulário
    event.preventDefault();

    // Obtém os valores dos campos
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var mensagemErro = document.getElementById('mensagemErro');

    // Limpa mensagem de erro anterior
    mensagemErro.textContent = '';

    // Validação simples
    if (email === '' || senha === '') {
        mensagemErro.textContent = 'Por favor, preencha todos os campos!';
        return;
    }

    // Se tudo estiver ok, exibe uma mensagem de sucesso (simulação)
    alert('Login realizado com sucesso! (simulação)');
});
