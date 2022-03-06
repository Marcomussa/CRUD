const select = document.querySelector('select')
const span = document.querySelector('#test')

console.log(new Date().toLocaleDateString())

let price = 1000

select.addEventListener('change', () => {
    let value = select.value
    if(value == 1){
        price = 1000
    }
    if(value == 2){
        price = 2000
    }
    if(value == 3){
        price = 3000
    }
    if(value == 4){
        price = 4000
    }
    span.innerHTML = price
})
