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

	let sql = 'SELECT * FROM merch_alert WHERE name = ?';

	let query = mysql.format(sql, req.body);

	db.query(query,(err, data) => {
		if(err) {
			console.error(err);
			return;
		}
		if(!data.length) {

			const unique_url = req.body + (Math.floor(Math.random() * 10000) + 111);

			let sql_new = "INSERT INTO merch_alert (name, unique_url) VALUES (?, ?)";

			db.query(sql_new, [(req.body).toUpperCase(), unique_url], (err, rows) => {
				if (err) throw err;
				console.log("Row inserted with id = "
				    + rows.insertId);
			});

			res.json({ "name" : unique_url })
		}
		else res.json(data);
	});
	res.status(200)
	// res.json({ message: 'ok' })
})

module.exports = router
