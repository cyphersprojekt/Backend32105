const axios = require('axios');
const logger = require('../controllers/logControl').logger;
// quiero recibir por user input las rutas y los ids, ademas de tener un menu en
// el que elegir que test realizar
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on("close", function() {
    console.log("\nAdios!");
    process.exit(0);
});

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
        console.error(err) }
}

async function testCreateNewProduct() {
    try {
        const response = await axios.post('http://localhost:8080/productos', {
            name: 'PRODUCTO TEST',
            price: '42069',
            thumbnail: 'https://i.pinimg.com/736x/e5/25/33/e52533822a28b4ca84ac08d6e049917c.jpg'
        })
        console.log(response.data)
    } catch (err) {
        console.error(err)
    }
}

async function testUpdateProduct(id) {
    try {
        const response = await axios.put(`http://localhost:8080/productos/${id}`, {
            name: 'PRODUCTO ACTUALIZADO VIA TEST',
            price: '69420',
            photo: 'https://previews.123rf.com/images/rozaliya/rozaliya0906/rozaliya090600096/5044218-3d-persona-muy-poco-ruidoso-r%C3%ADe-muy-gracioso.jpg'
        })
        console.log(response.data)
    } catch (err) {
        console.error(err)
    }
}

async function testDeleteProduct(id) {
    try {
        const response = await axios.delete(`http://localhost/productos/${id}`)
        console.log(response.data)
    } catch (err) {
        console.error(err)
    }
}

async function main() {
    rl.question(`Seleccione el test a realizar: \r\n
    1. testGetAllProducts \r\n
    2. testGetProductById \r\n
    3. testCreateNewProduct \r\n
    4. testUpdateProduct \r\n
    5. testDeleteProduct \r\n
    0. SALIR \r\n`, async function(selectedOption){
        switch(selectedOption) {
            case '1':
                await testGetAllProducts()
                rl.close()
            case '2':
                rl.question(`Indique el id a buscar: `, async function(idToSearch) {
                    await testGetProductById(idToSearch)
                })
            case '3':
                testCreateNewProduct()
                rl.close()
            case '4':
                rl.question(`Indique el id a actualizar: `, async function(idToUpdate) {
                    await testUpdateProduct(idToUpdate)
                    rl.close()
                })
            case '5':
                rl.question(`Indique el id a eliminar: `, async function(idToDelete) {
                    await testDeleteProduct(idToDelete)
                    rl.close()
                })
            case '0':
                rl.close()
            default:
                console.log(`No se que hacer con ${selectedOption}`)
                rl.close()
        }
    })
}

main()