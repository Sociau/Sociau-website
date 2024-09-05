document.getElementById('sociau_logo').addEventListener('click', function () {
    
    if (window.innerWidth < 768) {
        var ul = document.getElementById('menu-list');
        ul.style.display = ul.style.display === 'flex' ? 'none' : 'flex';
    } else {
        folder = (window.location.href).split('/')[4];

        if (folder == 'pages') {
            window.location.href = '../index.html';
        }else{
            window.location.href = 'index.html';
        }
        
    }
});