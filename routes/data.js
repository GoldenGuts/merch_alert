const express = require('express')
const router = express.Router()
const baseUrl = "https://forthefans.in:3000/alerts/"
const { mysql, pool } = require('../mysql_config/config')

router.post('/check-streamer', (req, res)=>{
	console.log('Streamer Name Sent By Generator ' + (req.body))

	let sql = 'SELECT * FROM merch_alert WHERE name = ?';

	let query = mysql.format(sql, req.body);

	pool.getConnection(function(err, connection) {
		connection.query(query,(err1, data) => {
			if(err1) {
				console.error(err1);
				return;
			}
			if(!data.length) {

				const unique_url = (req.body).toLowerCase() + (Math.floor(Math.random() * 10000) + 111);

				let sql_new = "INSERT INTO merch_alert (name, unique_url, complete_url) VALUES (?, ?, ?)";

				connection.query(sql_new, [(req.body).toUpperCase(), unique_url, (baseUrl+unique_url) ], (err2, rows) => {
					if (err2) throw err2;
					console.log("Row inserted with id = "
					+ rows.insertId);
				});
				
				res.json({ "url" : unique_url })
			}
			else {
				res.json(data);
			}
			console.log(pool._freeConnections.indexOf(connection)); // -1
      			connection.release();
      			console.log(pool._freeConnections.indexOf(connection)); // 0
		});
		// res.json({ message: 'ok' })
	})
})

module.exports = router
