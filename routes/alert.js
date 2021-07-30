const express = require('express')
const path = require('path')
const { mysql, db } = require('../mysql_config/config')
const router = express.Router();
let blankPage = 1;

router.get('/:streamer_url', (req, res)=>{

	var io = req.app.get('socketio');

	let sql = 'SELECT * FROM merch_alert WHERE unique_url = ?';

	let query = mysql.format(sql, req.params.streamer_url);

	db.query(query,(err, data) => {
		if(err) {
			console.error(err);
		} 
		if(!data.length) {
			res.redirect('https://forthefans.in/ERROR404')
			console.log('Wrong URL')
		}
		else {
			try { console.log(data[0].complete_url); } catch (e){console.log(e)}
			res.render('blankPage');
		}
	})
});

router.post('/:streamer_url', (req, res) => {

	res.render('alertMain', {
		name: JSON.parse(req.body).name,
		product: JSON.parse(req.body).product
	});

	console.log("name = " + JSON.parse(req.body).name)

	console.log(req.params.streamer_url)
	blankPage = 0
	res.status(200)
})

module.exports = router