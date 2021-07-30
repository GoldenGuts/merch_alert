const express = require('express')
const router = express.Router()
const baseUrl = "https://forthefans.in:3000/alerts/"
const { mysql, db } = require('../mysql_config/config')

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

			const unique_url = (req.body).toLowerCase() + (Math.floor(Math.random() * 10000) + 111);

			let sql_new = "INSERT INTO merch_alert (name, unique_url, complete_url) VALUES (?, ?, ?)";

			db.query(sql_new, [(req.body).toUpperCase(), unique_url, (baseUrl+unique_url) ], (err1, rows) => {
				if (err1) throw err1;
				console.log("Row inserted with id = "
				    + rows.insertId);
			});
			res.json({ "url" : unique_url })
		}
		else {
			res.json(data);
		}
	});
	res.status(200)
	// res.json({ message: 'ok' })
})

module.exports = router
