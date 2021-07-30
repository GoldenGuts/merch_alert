const mysql = require('mysql')

const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'ftf',
	password: '0mzflrSvuqBInE9',
	database: 'merch_alert'
})

db.connect(function(err) {
	if (err) {
	  return console.error('error: ' + err.message);
	}
	console.log('Connected to the MySQL server.');
});

module.exports = { mysql, db }