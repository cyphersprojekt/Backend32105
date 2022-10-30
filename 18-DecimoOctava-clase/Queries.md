```` 
> use Munozcoderhouse 
````
<sub>la coleccion 'products' la cree desde Compass </sub>

````
db.createCollection('messages')
````

````
db.messages.insertMany([
    {
        "email": "test@example.com",
        "fecha": Date(),
        "value": "#1"
    },
    {
        "email": "test@example.com",
        "fecha": Date(),
        "value": "#2"
    },
    {
        "email": "test@example.com",
        "fecha": Date(),
        "value": "#3"
    },
    {
        "email": "test@example.com",
        "fecha": Date(),
        "value": "#4"
    },
    {
        "email": "test@example.com",
        "fecha": Date(),
        "value": "#5"
    },
    {
        "email": "test@example.com",
        "fecha": Date(),
        "value": "#6"
    },
    {
        "email": "test@example.com",
        "fecha": Date(),
        "value": "#7"
    },
    {
        "email": "test@example.com",
        "fecha": Date(),
        "value": "#8"
    },
    {
        "email": "test@example.com",
        "fecha": Date(),
        "value": "#9"
    },
    {
        "email": "test@example.com",
        "fecha": Date(),
        "value": "#10"
    },
])
````

````
db.productos.insertMany([
    {
        "name": "product1",
        "description": "description1",
        "code": 0001,
        "thumbnail": "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        "stock": 100,
        "price": 1100,
        "date": Date()
    },
    {
        "name": "product2",
        "description": "description2",
        "code": 0002,
        "thumbnail": "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        "stock": 100,
        "price": 1200,
        "date": Date()
    },
    {
        "name": "product3",
        "description": "description3",
        "code": 0003,
        "thumbnail": "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        "stock": 100,
        "price": 1300,
        "date": Date()
    },
    {
        "name": "product4",
        "description": "description4",
        "code": 0004,
        "thumbnail": "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        "stock": 100,
        "price": 1400,
        "date": Date()
    },
    {
        "name": "product5",
        "description": "description5",
        "code": 0005,
        "thumbnail": "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        "stock": 100,
        "price": 1500,
        "date": Date()
    },
    {
        "name": "product6",
        "description": "description6",
        "code": 0006,
        "thumbnail": "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        "stock": 100,
        "price": 1600,
        "date": Date()
    },
    {
        "name": "product7",
        "description": "description7",
        "code": 0007,
        "thumbnail": "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        "stock": 100,
        "price": 1700,
        "date": Date()
    },
    {
        "name": "product8",
        "description": "description8",
        "code": 0008,
        "thumbnail": "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        "stock": 100,
        "price": 1800,
        "date": Date()
    },
    {
        "name": "product9",
        "description": "description9",
        "code": 0009,
        "thumbnail": "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        "stock": 100,
        "price": 1900,
        "date": Date()
    },
    {
        "name": "product10",
        "description": "description10",
        "code": 0010,
        "thumbnail": "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        "stock": 100,
        "price": 2000,
        "date": Date()
    },
    
])
````

````
db.products.insertOne(
    {
        "name": "product11",
        "description": "description11",
        "code": 0011,
        "thumbnail": "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
        "stock": 100,
        "price": 5000,
        "date": Date()
    }
)
````

````
db.products.find()
db.messages.find()
````

````
db.products.estimatedDocumentCount()
db.messages.estimatedDocumentCount()
````

````
db.products.find({price: {$lt: 1600}})
db.products.find({price: {$gt: 1800}})
db.products.find({price: {$gt:1600, $lt:1900})
````
<sub>se supone que db.products.find({price: {$range: [1600,1900,100]}}) deberia funcionar PORQUE ESTA EN LA DOCUMENTACION pero bueno mi mongo decidio que $range no existe</sub>

````
db.products.find({}).sort({price: 1}).skip(2).limit(1)
````

````
db.products.updateMany({}, {$set: {stock: 50}})
````
````
db.products.updateMany(
    {price: {$gt: 3000}},
    {$set: {stock:0}}
)
````
````
db.products.deleteMany({price: {$lt: 1200}})
````
````
use admin
db.createUser(
    {
        user: "pepe",
        pwd: "asd456",
        roles: [{role: "read", db:"Munozcoderhouse"}]
    }
)
````

````
PS> $env:Path += ';C:\Program Files\MongoDB\Tools\100\bin'
(porque me rehuso a tener mongo en mi path por mas de 5 minutos)

PS> mongodump --uri="mongodb://ignacio:contrasenasupersegura@localhost:27017/Munozcoderhouse?ssl=false&authSource=admin"

PS> Compress-Archive -Path .\dump\Munozcoderhouse\* -DestinationPath D:\Desktop\Backend\18-DecimoOctava-clase\Munozcoderhouse.zip