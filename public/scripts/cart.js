const cards = document.querySelector('#cards')
const items = document.querySelector('#items')
const footer = document.querySelector('#footer')
const templateCard = document.querySelector('#template-card').content
const templateCarrito = document.querySelector('#template-carrito').content
const templateFooter = document.querySelector('#template-footer').content
const fragment = document.createDocumentFragment()

let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

items.addEventListener('click', e => {
    btnAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('http://localhost:4000/api/productList')
        const data = await res.json()
        // pintarCards(data)
    } catch (error) { 
        console.log(error)
    }
}

const pintarCards = (data) => {
    data.forEach( (product) => {
        templateCard.querySelector('h5').textContent = product.name
        templateCard.querySelector('#productPrice').textContent = product.price
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

//! Evento:
cards.addEventListener('click', (e) => {
    addCarrito(e)
})

const addCarrito = e => {
    if(e.target.classList.contains('btnComprar')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}


const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h4').textContent,
        precio: Number(objeto.querySelector('#productPrice').textContent),
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {
        ...producto
    }

    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach( (producto) => {
        templateCarrito.querySelector('#idCart').textContent = producto.id
        templateCarrito.querySelector('#nameCart').textContent = producto.title
        templateCarrito.querySelector('#cantidadCart').textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('#totalCart').textContent = Number(producto.cantidad * producto.precio)

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''

    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `<p> Carrito Vacio - Comience a Comprar! </p>`
        return 
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce( (acc, {cantidad, precio}) => acc + cantidad * precio, 0)
    
    templateFooter.querySelector('#mostrarCantidadProductos').textContent = nCantidad
    templateFooter.querySelector('#mostrarTotalProductos').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}

const btnAccion = e => {
    if(e.target.classList.contains('btn-info')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }

    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0 ){
            delete carrito[e.target.dataset.id] 
        }
        pintarCarrito()
    }

    e.stopPropagation()
}