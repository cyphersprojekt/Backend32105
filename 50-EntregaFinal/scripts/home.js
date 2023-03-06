const socket = io()
socket.connect()

/* Me traigo los templates y los compilo, listos para pasarles valores y render */

async function fetchAndRender(data){
    const response = await fetch("./home_products.hbs")
    const template = await response.text()
    const dataCompile = Handlebars.compile(template)
    const result = dataCompile(data)
    return result
}

socket.on('currentProducts', async (data) =>{
    const productList = document.querySelector("#list-products")
    const newContent = await fetchAndRender(data)
    productList.innerHTML = newContent 
})

function searchSelect() {
    window.location=`/category/${document.querySelector('#categoryFinder').value}`
}