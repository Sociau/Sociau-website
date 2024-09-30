import {createAccount} from '../../services/api/index.js'

const importantFieldRedBorder = (id) => {
  const field = document.getElementById(id);
  field.style.border = '2px solid red';
}

const defaultFieldRedBorder = (id) => {
  const field = document.getElementById(id);
  field.style.border = 'transparent';
}

const verifyField = (field, id) => {
  if (field.length === 0) {
    importantFieldRedBorder(id);
    return;
  }else{
    defaultFieldRedBorder(id);
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

document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = document.getElementById('yourname').value;
  verifyField(name, 'yourname');

  const nickname = document.getElementById('surname').value;
  verifyField(nickname, 'surname');

  const email = document.getElementById('email').value;
  verifyField(email, 'email');

  const main_whatsapp = document.getElementById('whatsapp').value;
  verifyField(main_whatsapp, 'whatsapp');

  const second_whatsapp = document.getElementById('second-whatsapp').value;
  const about_you = document.getElementById('about-you').value;
  const password = document.getElementById('password').value;
  verifyField(password, 'password');

  const confirmPassword = document.getElementById('confirm-password').value;
  verifyField(confirmPassword, 'confirm-password');

  if (password !== confirmPassword) {
    console.log('As senhas devem ser iguais');
    return;
  }

  const state = document.getElementById('state').value;
  verifyField(state, 'state');

  const city = document.getElementById('city').value;
  verifyField(city, 'city');

  const street = document.getElementById('street').value;
  verifyField(street, 'street');

  const neighborhood = document.getElementById('neighborhood').value;
  verifyField(neighborhood, 'neighborhood');

  const number = parseInt((document.getElementById('street').value).split(',')[1]) || null;

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

  const response = await createAccount(data);

  console.log(response);

  if(response.status == 200){
    window.location.href = '../login/index.html';
  }

  else if(response.status == 400 && response.message == "Email already exists"){
    console.log('Email already exists');
  }
});
