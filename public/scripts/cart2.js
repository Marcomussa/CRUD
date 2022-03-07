function mostrarProducto(){
    let btn = document.querySelectorAll('#btnComprar')
    btn.forEach( (card) => {
        card.addEventListener('click', (e) => {
            let id = e.target.parentNode.parentNode.querySelector('div .id').textContent
            let title = e.target.parentNode.parentNode.querySelector('div h5').textContent
            let precio = Number(e.target.parentNode.parentNode.querySelector('div .precio').textContent)
            let cantidad = 1
            console.log('Producto Agregado')
            let prod = {
                id,
                title, 
                precio,
                cantidad
            }
            console.log(JSON.stringify(prod))
            console.log('--- --- --- --- ---')
        })
    })
}

mostrarProducto()