import { createAccount } from '../../services/api/index.js'

const importantFieldRedBorder = (id) => {
  const field = document.getElementById(id);
  field.style.border = '2px solid red';
}

const defaultFieldRedBorder = (id) => {
  const field = document.getElementById(id);
  field.style.border = '1px solid transparent';
}

const verifyField = (field, id) => {
  if (field.trim().length === 0) {
    importantFieldRedBorder(id);
    return false;
  } else {
    defaultFieldRedBorder(id);
    return true;
  }
}

const checkBtn = () => {
  const name = document.getElementById('yourname').value;
  const nickname = document.getElementById('surname').value;
  const email = document.getElementById('email').value;
  const emailConfirm = document.getElementById('email-confirm').value;
  const main_whatsapp = document.getElementById('whatsapp').value;
  const state = document.getElementById('state').value;
  const city = document.getElementById('city').value;
  const street = document.getElementById('street').value;
  const neighborhood = document.getElementById('neighborhood').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const aboutYou = document.getElementById('about-you').value;

  const allFieldsFilled = name && nickname && email && emailConfirm && main_whatsapp && state && city && street && neighborhood && password && confirmPassword && aboutYou;
  const passwordsMatch = password === confirmPassword;
  const emailsMatch = email === emailConfirm;

  document.getElementById('register-btn').disabled = !(allFieldsFilled && passwordsMatch && emailsMatch);
};

document.querySelectorAll('#registerForm input, #registerForm textarea').forEach(input => {
  input.addEventListener('input', checkBtn);
});

document.getElementById('registerForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const name = document.getElementById('yourname').value;
  const nickname = document.getElementById('surname').value;
  const email = document.getElementById('email').value;
  const emailConfirm = document.getElementById('email-confirm').value;
  const main_whatsapp = document.getElementById('whatsapp').value;
  const second_whatsapp = document.getElementById('second-whatsapp').value;
  const about_you = document.getElementById('about-you').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const state = document.getElementById('state').value;
  const city = document.getElementById('city').value;
  const street = document.getElementById('street').value;
  const neighborhood = document.getElementById('neighborhood').value;
  const number = parseInt((document.getElementById('street').value).split(',')[1]) || null;

  let formValid = true;
  formValid &= verifyField(name, 'yourname');
  formValid &= verifyField(nickname, 'surname');
  formValid &= verifyField(email, 'email');
  formValid &= verifyField(main_whatsapp, 'whatsapp');
  formValid &= verifyField(password, 'password');
  formValid &= verifyField(confirmPassword, 'confirm-password');
  formValid &= verifyField(state, 'state');
  formValid &= verifyField(city, 'city');
  formValid &= verifyField(street, 'street');
  formValid &= verifyField(neighborhood, 'neighborhood');

  if (!formValid) {
    console.log("Campos obrigatórios não preenchidos corretamente.");
    return;
  }

  if (password !== confirmPassword) {
    importantFieldRedBorder('password');
    importantFieldRedBorder('confirm-password');
    console.log('As senhas devem ser iguais');
    return;
  }

  if (email !== emailConfirm) {
    importantFieldRedBorder('email');
    importantFieldRedBorder('email-confirm');
    console.log('Os emails devem ser iguais');
    return;
  }

  const address = {
    state,
    city,
    street,
    neighborhood,
    number
  }

  const data = {
    name,
    nickname,
    email,
    main_whatsapp,
    second_whatsapp,
    about_you,
    password,
    address
  };

  try {
    const response = await createAccount(data);

    console.log(response)

    if (response.status == 200) {
      document.getElementById('modal-register').style.display = "flex";
      document.getElementById('modal-title').innerHTML = "Conta criada com sucesso!";
      document.getElementById('modal-text').innerHTML = "Clique no botão abaixo para fazer o login";
      document.getElementById('close-modal').value = "Fazer login";
      document.getElementById('close-modal').addEventListener('click', function () {
        window.location.href = '../login/index.html'
      });
    } else if (response.status == 400 && response.message == "Email already exists") {
      document.getElementById('modal-register').style.display = "flex";
      document.getElementById('close-modal').addEventListener('click', function () {
        document.getElementById('modal-register').style.display = "none";
      });
    }
  } catch (error) {
    console.error("Erro ao criar conta:", error);
  }
});
