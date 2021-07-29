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

router.get('/getposts', (req, res) => {
	let sql = 'SELECT * FROM merch_alert';
	let query = db.query(sql, (err, results) => {
	    if(err) throw err;
	    console.log(results);
	    res.send('Posts fetched...');
	});
});

router.post('/check-streamer', (req, res)=>{
	console.log('inside check streamer' + req)

	res.json()
})

module.exports = router