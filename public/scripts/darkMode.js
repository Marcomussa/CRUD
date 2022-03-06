window.onload = function(){
    const chk = document.getElementById('chk');
    chk.addEventListener('change', () => {
        document.querySelectorAll('.subContProductIndex').forEach(item => {
            item.classList.toggle('backgroundDarkCards')            
        })
        document.getElementById('navContainer').classList.toggle('backgroundDark')
        document.getElementById('contenedorIndex').classList.toggle('backgroundDark')
        document.body.classList.toggle('dark');
    });   
}