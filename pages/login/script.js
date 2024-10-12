import { login } from '../../services/api/index.js'

const form = document.getElementById('loginForm');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('userpassword').value;

  try {
    const data = await login(username, password);

    if (data.status == 404) {
      document.getElementById('modal-register').style.display = "flex";
      document.getElementById('modal-title').innerHTML = "Conta não encontrada";
      document.getElementById('modal-text').innerHTML = "Tente novamente, ou crie uma conta";
      document.getElementById('close-modal').addEventListener('click', function () {
        document.getElementById('modal-register').style.display = "none";
      });
    }

    if (data.status == 200) {
      window.location.href = '../../index.html';
    }
  } catch (error) {
    console.log(error)
  }


});