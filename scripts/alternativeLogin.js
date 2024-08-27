document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Usuário:', username);
    console.log('Senha:', password);

});