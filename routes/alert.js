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
			if(blankPage == 1) res.render('blankPage');
			if(blankPage == 0 ){
				res.render('alertMain', {
					name: req.body.name,
					product: req.body.product
				});
				setTimeout(function(){ blankPage = 1 }, 7000);
			}
		}
	})
});

router.post('/:streamer_url', (req, res) => {

	console.log("inside post request")

	console.log(req.params.streamer_url)
	blankPage = 0
	res.status(200)
})

module.exports = router