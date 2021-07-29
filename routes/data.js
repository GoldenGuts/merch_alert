const express = require('express')
const mysql = require('mysql')
const router = express.Router()

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

router.post('/check-streamer', (req, res)=>{
	console.log('Streamer Name Sent By Generator ' + (req.body))
	// let response_data;

	let sql = 'SELECT * FROM merch_alert WHERE name = ?';

	let query = mysql.format(sql, req.body);

	db.query(query,(err, data) => {
		if(err) {
			console.error(err);
			return;
		}

		// rows fetch

		// response_data = data;
		console.log(data);
	});
	// res.status(200).json(response_data);
	res.json({ message: 'ok' })
})

module.exports = router
