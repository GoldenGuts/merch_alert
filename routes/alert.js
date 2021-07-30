const express = require('express')
const path = require('path')
const { mysql, db } = require('../mysql_config/config')
const router = express.Router();
const { alert_data } = require('./webhook')

router.get('/:streamer_url', (req, res)=>{

	var io = req.app.get('socketio');

	//socket rooms
	//

	// const note = response.body.customer_note
	// const streamer = response.body.line_items[0].sku.slice(0,4)
	// const product  = response.body.line_items[0].sku.slice(0,5)
	// const buyer = response.body.billing.first_name

	// TODO 
	// Find if name exist in streamers.json
	// Math.random().toString(36).slice(2);
	
	// let emptyPage = 0;

	// if(emptyPage == 1)
	// {    
	//     res.render('blankPage');
	// }

	let sql = 'SELECT * FROM merch_alert WHERE unique_url = ?';

	let query = mysql.format(sql, req.params.streamer_url);

	db.query(query,(err, data) => {
		if(err) {
			console.error(err);
		} else {
			console.log(data[0].complete_url);
			res.render('alertMain', {
				name: 'name',
				product: 'product'
			});
		}    
	});
	
	// res.sendFile(path.join(__dirname, '../templates/blogPage.html'))
})

module.exports = router