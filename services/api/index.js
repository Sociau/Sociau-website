import config from './config.js'

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
  
    const data = await response.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
    }
    return data
  }catch(error){
    console.log(error)
  }
}

const createAccount = async (person) => {
  try{
    const response = await fetch(`${config.BASE_URL}create_account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    })
  
    const data = await response.json()
    return data
  }catch(error){
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

export { login, createAccount, getToken, getUser, logout }