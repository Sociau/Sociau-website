import config from './config.js'

const login = async (nickname, password) => {
  try {
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

    const data = await response.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.person))
      localStorage.setItem('address', JSON.stringify(data.address))
    }
    return data
  } catch (error) {
    console.log(error)
  }
}

const createAccount = async (person) => {
  try {

    const formData = new FormData();

    formData.append('name', person.name);
    formData.append('nickname', person.nickname);
    formData.append('email', person.email);
    formData.append('main_whatsapp', person.main_whatsapp);
    formData.append('second_whatsapp', person.second_whatsapp);
    formData.append('about_you', person.about_you);
    formData.append('password', person.password);

    if (person.address) {
      formData.append('state', person.address.state);
      formData.append('city', person.address.city);
      formData.append('street', person.address.street);
      formData.append('neighborhood', person.address.neighborhood);
      formData.append('number', person.address.number);
    }

    if (person.avatarFile) {
      formData.append('avatar', person.avatarFile);
    }
    const response = await fetch(`${config.BASE_URL}create_account`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

const getToken = () => {
  return localStorage.getItem('token')
}

const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

const getPets = async (filter) => {
  try {
    const response = await fetch(`${config.BASE_URL}pets?${filter ? filter : ''}`, {
      method: 'GET',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

const getPetById = async (id) => {
  try {
    const response = await fetch(`${config.BASE_URL}pets/${id}`, {
      method: 'GET',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

const getAdoptionHistory = async () => {
  try {
    const user_id = JSON.parse(localStorage.getItem("user")).id
    const response = await fetch(`${config.BASE_URL}adoption/${user_id}`, {
      method: 'GET',
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export { login, createAccount, getToken, getUser, logout, getPets, getAdoptionHistory, getPetById }