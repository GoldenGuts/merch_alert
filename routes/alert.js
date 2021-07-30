const express = require('express')
const path = require('path')
const { mysql, db } = require('../mysql_config/config')
const router = express.Router();

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
	});
})

router.get('/streamer_url', (req, res) => {
	res.render('alertMain', {
		name: req.body.name,
		product: req.body.product
	});
})

router.post('/:streamer_url', (req, res) => {
	res.redirect(`/${req.params.streamer_url}`)
	console.log(req.params.streamer_url)
	res.status(200)
})

module.exports = router