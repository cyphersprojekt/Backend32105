const fs = require('fs');

class Product {
    constructor(name, price, thumbnail, id) {
        this.name = name;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;
    }
}

class Contenedor {
    constructor(path) {
        this.path = path;
    }

    createFile() {
        fs.writeFileSync(this.path, '', (e) => {
            if (e) { console.log(e); }
        });
    }

    save(obj) {
        try {
            if (!fs.existsSync(this.path) || fs.readFileSync(this.path).length === 0) {
                this.createFile();
                obj.id = 1;
                let data = [obj];
                //data.push(obj);
                fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
                console.log(`Se creo el archivo nuevo y se inserto ${obj.name} porque no existia`)
                return {"created":`${obj.id}`};
            } else {
                let data = JSON.parse(fs.readFileSync(this.path));
                //console.log(`CONTENIDO DEL ARCHIVO ANTES DE TOCAR NADA`)
                //console.log(data)
                obj.id = data.length + 1;
                data.push(obj)
                //console.log(`\r\nCONTENIDO DEL ARRAY LUEGO DE AGREGARLE UN OBJETO`)
                //console.log(data)
                console.log(`Se agrego el objeto ${obj.name} al archivo que ya estaba`)
                fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
                return {"created":`${obj.id}`};

            }
        } catch(e){ console.log(e) }
    }

    update(id, newData) {
        try {
            let data = JSON.parse(fs.readFileSync(this.path));
            let index = data.findIndex(x => x.id === id);
            if (index == -1 ) {
                return {"error": "no se encontro el id para actualizer"}
            } else {
                data[index].title = newData.title;
                data[index].price = newData.price;
                data[index].thumbnail = newData.thumbnail;
                fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
                return {"success": `se actualizo el producto con id ${id}`}
            } } catch(e){ console.log(e)  }
        }
    getById(id) {
        try {
            let data = JSON.parse(fs.readFileSync(this.path));
            let index = data.findIndex(x => x.id === id);
            if (index == -1) {return null}
            else { return (data[index])
        }} catch(e){ console.log(e) } }


    // Busco el indice de del item que queremos borrar.
    // Si no lo encuentro, hago un console log 'negativo'
    // si lo encuentro, lo saco del array
    // y le resto 1 a todos los objetos con id mayor al que acabo de borrar
    // para evitar ids repetidos si agrego uno luego.
    deleteById(id) {
        try {
            let data = JSON.parse(fs.readFileSync(this.path));
            let index = data.findIndex(x => x.id === id);
            if (index == -1) {return {"error": `no se encontro el item con id ${id}`}}
            else { 
                data.splice(index, 1);
                data.forEach((element) =>{ if (element.id > index) {element.id -= 1}} );
                fs.writeFileSync(this.path, JSON.stringify(data, null, 2))                ;
                return {"success": `Se borro el id ${id} con indice ${index}`}}
        } catch(e){ console.log(e) } }


    getAllData() {
        try {
            let data = JSON.parse(fs.readFileSync(this.path));
            //console.log(data);
            return data }catch(e){ console.log(e)
        }
    }

    deleteAllData() {
        this.createFile();
    }
}


console.log(`\r\n`)
//const container1 = new Contenedor('productos.txt');
// const producto1 = new Product('guardame', '$1', 'favicon.ico');
// const producto2 = new Product('borrame', '$2', 'favicon.ico');
// const producto3 = new Product('buscame', '$3', 'favicon.ico');

// container1.save(producto1);
// container1.save(producto2);
// container1.save(producto3);
// console.log(`\r\nCONTENIDO DEL CONTAINER ANTES DE HACER NADA:`)
// console.log(container1.getAllData())
// console.log(`\r\nBUSCO POR ID`)
//console.log(container1.getById(3));
// console.log(`\r\nBORRO POR ID`)
// console.log(container1.deleteById(2));

module.exports = Contenedor;
//module.exports = Product;