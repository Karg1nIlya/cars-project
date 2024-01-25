const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "samara63",
    host: "localhost",
    port: 5432,
    database: "CarsDB"
})

module.exports = pool