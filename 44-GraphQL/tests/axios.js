const axios = require('axios');

async function testGetAllProducts() {
    try {
        let response = await axios.get('http://localhost:8080/productos');
        console.log(response.data)
    } catch (err) {
        console.error(err)
    }
}

async function testGetProductById(id) {
    try {
        const response = await axios.get(`http://localhost:8080/productos/${id}`);
        console.log(response.data)
    } catch (err) {
        console.error('oopsGetAll') }
}

function testCreateNewProduct() {
    try {
        const response = axios.post('http://localhost:8080/productos', {
            name: 'PRODUCTO TEST',
            price: '42069',
            thumbnail: 'https://i.pinimg.com/736x/e5/25/33/e52533822a28b4ca84ac08d6e049917c.jpg'
        })
        console.log(response.data)
    } catch (err) {
        console.error('oopsInsert')
    }
}

async function testUpdateProduct(id) {
    try {
        const response = await axios.put(`http://localhost:8080/productos/${id}`, {
            newName : 'PRODUCTO ACTUALIZADO VIA TEST',
            newPrice :  '69420',
            newThumbnail : 'https://previews.123rf.com/images/rozaliya/rozaliya0906/rozaliya090600096/5044218-3d-persona-muy-poco-ruidoso-r%C3%ADe-muy-gracioso.jpg'
        })
        console.log(response.data.toString())
    } catch (err) {
        console.error('oopsUpdate')
    }
}

async function testDeleteProduct(id) {
    try {
        const response = await axios.delete(`http://localhost:8080/productos/${id}`)
        console.log(response.data)
    } catch (err) {
        console.error('oopsDelete')
    }
}


async function main() {
    console.log('TODOS LOS PRODUCTOS: \r\n')
    await testGetAllProducts()

    console.log('CREO UN PRODUCTO NUEVO: \r\n')
    await testCreateNewProduct()

    console.log('BUSCO EL PRODUCTO INSERTADO \r\n')
    await testGetProductById('63defdb05ffda324aa47248b')

    /* evidentemente a pesar de la cantidad de horas que llevo
    metidas en este curso todavia no se escribir este lenguaje
    porque me fue IMPOSIBLE awaitear el resultado de
    el insert anterior */

    console.log('ACTUALIZO EL PRODUCTO INSERTADO \r\n')
    await testUpdateProduct('63deff9a63659c1ffaf15a14')

    console.log('LO BUSCO DE VUELTA PA VER QUE SE HAYA CAMBIADO TODO \r\n')
    await testGetProductById('63deff9a63659c1ffaf15a14')

    console.log('LO ELIMINO PARA NO METER MUGRE EN LA DB')
    await testDeleteProduct('63deff9a63659c1ffaf15a14')
}

main()