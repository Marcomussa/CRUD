let $ = (par) => document.querySelector(par)
let inputSearch = $('#inputSearch')
let btnSearch = $('#btnSearch')
let resultado = $('#results')

async function getProducts(){
    await fetch('http://localhost:4000/api/productList')
    .then(res => res.json())
    .then(products => {

        function searchProduct(){
            resultado.innerHTML = ''
            const txt = inputSearch.value.toLowerCase()
            for(let product of products){
                let name = product.name.toLowerCase()
                if(name.indexOf(txt) !== -1){
                    // resultado.innerHTML += `
                    //     <p> ${product.name} </p>
                    // `
                    console.log(product.name)
                }
            }

            if(resultado.innerHTML === ''){
                resultado.innerHTML += `
                    <p> Producto no encontrado... </p>
                `
            }
        }
    
        btnSearch.addEventListener('click', searchProduct)
        
    })
}

getProducts()