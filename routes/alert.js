const express = require('express')
const path = require('path')
const { mysql, pool } = require('../mysql_config/config')
const router = express.Router();

router.get('/:streamer_url', (req, res)=>{

	var io = req.app.get('socketio');

	let sql = 'SELECT * FROM merch_alert WHERE unique_url = ?';

	let query = mysql.format(sql, req.params.streamer_url);

	pool.getConnection(function(err, connection) {
		connection.query(query,(err1, data) => {
			if(err1) {
				console.error(err1);
			} 
			if(!data.length) {
				res.redirect('https://forthefans.in/ERROR404')
				console.log('Wrong URL')
			}
			else {
				try { console.log(data[0].complete_url); } catch (e){console.log(e)}
				res.render('alertMain');
			}
			console.log(pool._freeConnections.indexOf(connection)); // -1
      			connection.release();
      			console.log(pool._freeConnections.indexOf(connection)); // 0
		})
	})
	
});

module.exports = router