const mysql = require('mysql')

const pool = mysql.createPool({
	connectionLimit : 10,
	host: '127.0.0.1',
	user: 'ftf',
	password: '0mzflrSvuqBInE9',
	database: 'merch_alert'
})

module.exports = { mysql, pool }