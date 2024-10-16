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