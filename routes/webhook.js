const express = require('express')
const router = express.Router()

router.post('/get_data', (request,response) => {

	var io = request.app.get('socketio');
	var alertsNsp = io.of('/alerts');

	response.status(200).json({ message: 'ok' });
	
	const streamer = request.body.line_items[0].sku.slice(0,4)
	const dataObj  = {
		name: request.body.billing.first_name,
		product: request.body.line_items[0].sku.slice(4,5),
		note: request.body.customer_note
	}

	console.log(dataObj);
	console.log(new Date());

	const { pool } = require('../mysql_config/config')
	let sql = `SELECT * FROM merch_alert WHERE name=?`;
	pool.getConnection(function(err, connection) {
		connection.query(sql, streamer.toString().toUpperCase(), (error, results, fields) => {
			if (error) {
				return console.error(error.message);
			}
			if(!results.length) {
				console.log('Wrong Name')
			}
			else {
				console.log('FOUND THE STREAMER YAYAY!!')
				const streamer_url = results[0].complete_url;
				console.log(streamer_url)
				alertsNsp.to(streamer_url).emit("order_alert", dataObj);
			}
			console.log(pool._freeConnections.indexOf(connection)); // -1
			connection.release();
			console.log(pool._freeConnections.indexOf(connection)); // 0
		})
		
	});
})

module.exports =  router