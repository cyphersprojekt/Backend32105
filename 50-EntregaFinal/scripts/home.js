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
    // si estoy en el root, no tiene sentido ir a una vista detallada para
    // 'All', pero si ya estoy en la vista detallada de una categoria,
    // tiene sentido que quizas quiera volver para atras o cambiar hacia otra
    if (window.location.pathname == '/') {
        if (document.querySelector('#categoryFinder').value != '') {
            window.location=`/categorias/${document.querySelector('#categoryFinder').value}`
        }
    } else {
        if (document.querySelector('#categoryFinder').value != '') {
            window.location=`/categorias/${document.querySelector('#categoryFinder').value}`
        } else {
            window.location='/'
        }
    }    
}