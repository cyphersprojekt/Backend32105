const Knex = require("knex") 

let knex = Knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "root"
    }
})

knex.raw('CREATE DATABASE coderhouse').then(() => {
    console.log("database created")
    knex.destroy()})