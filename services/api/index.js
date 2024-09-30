import config from './config.js';

const login = async (nickname, password) => {
  try{
    const response = await fetch(`${config.BASE_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname,
        password,
      }),
    })
  
    const data = await response.json();
    return data
  }catch(error){
    console.log(error)
  }
};

const createAccount = async (person) => {
  try{
    const response = await fetch(`${config.BASE_URL}create_account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    })
  
    const data = await response.json();
    return data
  }catch(error){
    console.log(error)
  }
};

export { login, createAccount }