const fs = require('fs');

class Product {
    constructor(id, timestamp, name, description, code, thumbnail, price, stock) {
        this.id = id;
        this.timestamp = timestamp;
        this.name = name;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
    }
}

class Contenedor {
    constructor(path) {
        this.path = path;
    }

    createFile() {
        fs.writeFileSync(this.path, '[]', (e) => {
            if (e) { 
                console.log(e); 
            }
        });
    }

    save(obj) {
        try {
            if (!fs.existsSync(this.path) || fs.readFileSync(this.path).length === 0) {
                this.createFile();
                obj.id = 1;
                let data = [obj];
                fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
                console.log(`Se creo el archivo nuevo y se inserto ${obj.name} porque no existia`)
                return {"created":`${obj.id}`};
            } else {
                let data = JSON.parse(fs.readFileSync(this.path));
                obj.id = data.length + 1;
                data.push(obj)
                console.log(`Se agrego el objeto ${obj.name} al archivo que ya estaba`)
                fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
                return {"created":`${obj.id}`};
            }
        } catch(e){ 
            console.log(e) 
        }
    }

    update(id, newData) {
        try {
            let data = JSON.parse(fs.readFileSync(this.path));
            let index = data.findIndex(x => x.id === id);
            if (index == -1 ) {
                return {"error": "no se encontro el id para actualizer"}
            } else {
                data[index].name = newData.name;
                data[index].description = newData.description;
                data[index].code = newData.description;
                data[index].thumbnail = newData.thumbnail;
                data[index].price = newData.price;
                data[index].stock = newData.stock;
                fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
                return {"success": `se actualizo el producto con id ${id}`}
            }} catch(e) { 
                console.log(e)
            }
        }

        addProductoToCarrito(id, producto) {
            try {
                let data = JSON.parse(fs.readFileSync(this.path));
                let index = data.findIndex(x => x.id === id);
                if (index == -1 ) {
                    return {"error": "no se encontro el id para actualizer"}
                } else {
                    data[index].productos.push(producto);
                    fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
                    return {"success": `se guardo el producto id ${producto.id} en el carrito id ${id}`}
                }} catch(e) { 
                    console.log(e)
                }
            }


    getById(id) {
        try {
            let data = JSON.parse(fs.readFileSync(this.path));
            let index = data.findIndex(x => x.id === id);
            if (index == -1) { return null }
            else { return (data[index]) }
        } catch(e) {
            console.log(e)
        }
    }

    // Busco el indice de del item que queremos borrar.
    // Si no lo encuentro, hago un console log 'negativo'
    // si lo encuentro, lo saco del array
    // y le resto 1 a todos los objetos con id mayor al que acabo de borrar
    // para evitar ids repetidos si agrego uno luego.
    deleteById(id) {
        try {
            let data = JSON.parse(fs.readFileSync(this.path));
            let index = data.findIndex(x => x.id === id);
            if (index == -1) {
                return {"error": `no se encontro el item con id ${id}`}
            }
            else { 
                data.splice(index, 1);
                data.forEach((element) =>{ if (element.id > index) {element.id -= 1}} );
                fs.writeFileSync(this.path, JSON.stringify(data, null, 2))                ;
                return {"success": `Se borro el id ${id} con indice ${index}`}
            }
        } catch(e) { console.log(e) } }


    getAllData() {
        try {
            let data = JSON.parse(fs.readFileSync(this.path));
            return data } catch(e) {
                if (e.code === "ENOENT") {
                    console.log(`Se creo el archivo ${this.path}`)
                    this.createFile()}
                else {console.log(e);}
        }
    }

    deleteAllData() {
        this.createFile();
    }
}


console.log(`\r\n`)


module.exports = Contenedor;