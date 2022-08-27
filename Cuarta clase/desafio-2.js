const fs = require('fs');

class Product{

    constructor(name, price, id){
        this.name = name;
        this.price = price;
        this.id = id;        
    }


}

class Container{
    constructor(path){
        this.path = path;
    }

    async createFile(){
        fs.appendFileSync(this.path, '[]', (e) =>{
            if(e){
                console.log(e);
                }
        });
    }

    async createFileIfNotExists(){
        try {
            await fs.promises.readFile(this.path, 'utf8');
        } catch(e){
            if(e.code === 'ENOENT'){
                this.createFile();
            }
        }
    }

    async getAllData(){
        try {
            const allData = JSON.parse(await fs.promises.readFile(this.path, 'utf8'));
            return allData;
        } catch(e) {
            const allData = [];
            return allData;
        }
        
    }

    async getById(id){
        try {
            const data = await this.getAllData();
            return data.find((element) => element.id === id);
        } catch(e){
            console.log(e)
        }
    }

    async delItem(id){
        try {
            const data = await this.getAllData();
            const rmIdx = data.find((element) => element.id === id);

            if(rmIdx){
                const idx = data.indexOf(rmIdx);
                data.splice(idx, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(data));
                return;
        } else {
            console.log('niet');
            return;
        } } catch (e) {
            console.log(e);
        }
    }

    async appendObject(obj){
        try {
            const allData = await this.getAllData();
            obj.id = allData.length +1;
            allData.push(obj);
            await fs.promises.appendFile(this.path, JSON.stringify(allData, null, 2));
            return obj.id;
        } catch(e){
            console.log(e);
        }
    }

    async deleteAllData(){
        try {
            await this.createFile();
        } catch(e){
            console.log(e);
        }
    }
}

const c1 = new Container('./test.json');
const p1 = new Product('Juan', '$2', 1);
const p2 = new Product('Pedro', '$3', 2);
c1.appendObject(p1);
c1.appendObject(p2);