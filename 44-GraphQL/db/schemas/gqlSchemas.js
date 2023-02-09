const { buildSchema } = require('graphql');

const gqlSchema = buildSchema(
    `
    type Producto {
        _id: String,
        name: String,
        price: Int,
        thumbnail: String
    }
    
    input inputForNewProduct {
        name: String!,
        price: Int!,
        thumbnail: String!
    }
    
    type Query {
        getAllProducts: [Producto],
        getProductById(_id: String!): Producto
    }

    type Mutation {
        createNewProduct(product: inputForNewProduct): Producto,
        updateProduct(_id: String!, product: inputForNewProduct): Producto,
        deleteProduct(_id: String!): String
    }
    `
)

module.exports = gqlSchema