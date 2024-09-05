document.getElementById('sociau_logo').addEventListener('click', function () {
    if (window.innerWidth < 768) {
        var ul = document.getElementById('menu-list');
        ul.style.display = ul.style.display === 'flex' ? 'none' : 'flex';
    } else {
        window.location.href = 'index.html';
    }
});