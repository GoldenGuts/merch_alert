const express = require('express')
const router = express.Router()

router.post('/get_data', (request,response) => {

	var io = req.app.get('socketio');
	var alertsNsp = io.of('/alerts');

	response.status(200).json({ message: 'ok' });

	console.log(request.body);

	// const note = response.body.customer_note

	const streamer = response.body.line_items[0].sku.slice(0,4)
	const dataObj  = {
		// product: response.body.line_items[0].sku.slice(0,5),
		product: "T-Shirt",
		name: response.body.billing.first_name
	}

	const { db } = require('./mysql_config/config')
	let sql = `SELECT * FROM merch_alert WHERE name=?`;
	db.query(sql, streamer.toString().toUpperCase(), (error, results, fields) => {
	  if (error) {
	    return console.error(error.message);
	  }
	  if(!results.length) {
	    console.log('Wrong Name')
	  }
	  else {
	    const streamer_url = results[0].complete_url;
	    alertsNsp.to(streamer_url).emit("order_alert", dataObj);
	  }
	})
});

module.exports =  router