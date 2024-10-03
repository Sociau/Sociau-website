import {login} from '../../services/api/index.js'

const form = document.getElementById('loginForm');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('userpassword').value;

    const data = await login(username, password);

    if(data.status == 404){
      alert('Não achou')
    }

    if(data.status == 200){
      window.location.href = '../../index.html';
    }
});