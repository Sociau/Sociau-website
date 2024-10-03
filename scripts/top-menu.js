import {logout} from '../services/api/index.js'
document.getElementById('login-btn').style.display = 'none';
document.getElementById('on-logged').style.display = 'none';

const isLogged = ()=>{
    const token = localStorage.getItem('token');
    const login_btn = document.getElementById('login-btn');
    const logged_menu = document.getElementById('on-logged');

    if(token){
        logged_menu.style.display = 'flex';
        login_btn.style.display = 'none';
        return false;
    }else{
        logged_menu.style.display = 'none';
        login_btn.style.display = 'flex';
    }
}

window.addEventListener('load', isLogged);

document.getElementById('on-logged').addEventListener('click', function () {
    const submenu = document.getElementById('logged-options');
    const onLogged = document.getElementById('on-logged');

    submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';

    if (submenu.style.display === 'flex') {
        onLogged.style.backgroundColor = '#D06C10';
    } else {
        onLogged.style.backgroundColor = '#f58d2d';
    }
})

document.getElementById('sociau_logo').addEventListener('click', function () {
    if (window.innerWidth < 821) {
        var ul = document.getElementById('menu-list');
        ul.style.display = ul.style.display === 'flex' ? 'none' : 'flex';
    } else {
        
        window.location.href = 'index.html';
    }
});

document.getElementById('logout-btn').addEventListener('click', function () {
    logout();
    window.location.href = 'index.html';
})