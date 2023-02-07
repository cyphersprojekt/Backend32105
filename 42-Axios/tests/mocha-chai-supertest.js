const request = require('supertest');
const app = require('../app/app').app;
const expect = require('chai').expect;
const { faker } = require('@faker-js/faker');
//const faker = require('faker'); me habia olvidado que el creador de faker hizo lo que todo ser humano razonable haria
// y dejo de laburar gratis

//tengo permitido usar mi producto dto aca? o se supone que no debo?
function createFakeProduct() {
    newProduct = {
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        //por que le pongo la foto de juan de los palotes a mi producto?
        // porque no encontre una forma de que me devuelva una torta o algo
        // por el estilo
        thumbnail: faker.internet.avatar()
    }
    return newProduct;
}

//que es esto, parece cobol
describe('Test con mocha/chai/supertest', () => {
    describe('GET', async () => {
        it('devuelve status 200 si la app esta arriba', async () => {
            request(app).get('/').expect(200)
        })
    })
    
    describe('GET', () => {
        it('devuelve todos los productos', async () => {
            request(app).get('/productos')
        })
    })

    describe('GET', () => {
        it('busca un producto por id', async () => {
            obj = await request(app).get('/productos/63defdb05ffda324aa47248b')
            expect(obj.status).to.eql(200)
            expect(obj.body).to.eql({
                "_id":"63defdb05ffda324aa47248b",
                "name":"PRODUCTO TEST",
                "price":42069,
                "thumbnail":"https://i.pinimg.com/736x/e5/25/33/e52533822a28b4ca84ac08d6e049917c.jpg",
                "__v":0
            })
        })
    })

    //aca no puedo hacer un expect de lo q le mande por body xq mi controller
    //unicamente devuelve el id de lo insertado
    describe('POST', () => {
        it('inserta un producto generado x la funcion de arriba', async () => {
            let newProduct = createFakeProduct()
            console.log(newProduct)
            let response = await request(app).post('/productos').send(newProduct)
            expect(response.body).to.eql(newProduct)
        })
    })

    //si me pidieran que escriba algo mas feo que esto a proposito no podria
    describe('PUT', () => {
        it('modifica un producto', async () => {
        newProduct = createFakeProduct()
        reqAllProducts = await request(app).get('/productos')
        allProducts = reqAllProducts.body
        console.log(allProducts)
        lastProduct = allProducts[allProducts.length - 1]
        await request(app).put(`/productos/${lastProduct._id}`).send({
            newName: lastProduct.name,
            newPrice: Number(lastProduct.price)*10, //just because
            newThumbnail: lastProduct.thumbnail
        })
        reqUpdatedProduct = await request(app).get(`/productos/${lastProduct._id}`)
        updatedProduct = reqUpdatedProduct.body
        expect(updatedProduct.name).to.equal(lastProduct.name)
        expect(Number(updatedProduct.price)).to.equal(Number(lastProduct.price)*10)
        expect(updatedProduct.thumbnail).to.equal(lastProduct.thumbnail)
        })
    })

    describe('DELETE', () => {
        it('elimina el anteultimo producto', async () => { //por que el anteultimo? porque meti un monton de 'productos test' con axios
                                                            // y no le hace mal a nadie ir limpiando un poquito
            reqAllProducts = await request(app).get('/productos')
            allProductsArr = reqAllProducts.body
            secondToLastProduct = allProductsArr[allProductsArr.length - 1] // lenguaje de juguete como no vas a poder acceder a la posicion '-1' de un array
            deleteRequest = await request(app).delete(`/productos/${secondToLastProduct._id}`)
            console.log(deleteRequest.body)
            // expect(deleteRequest.body).to.equal(`se elimino el producto con id ${secondToLastProduct._id}`)
            searchForDeletedProduct = await request(app).get(`/productos/${secondToLastProduct._id}`)
            // expect(searchForDeletedProduct.body).to.eql(`se elimino el producto con id ${secondToLastProduct._id}`)
        })
    })
})