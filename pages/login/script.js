import {login} from '../../services/api/index.js'

const form = document.getElementById('loginForm');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('userpassword').value;

    console.log(username, password);

    const data = await login(username, password);

    console.log(data);

    if(data.status == 404){
      console.log('Não achou')
    }
});