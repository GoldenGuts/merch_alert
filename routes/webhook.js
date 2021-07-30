const express = require('express')
const router = express.Router()

router.post('/get_data', (request,response) => {

	var io = req.app.get('socketio');
	var alertsNsp = io.of('/alerts');

	console.log('this ran');

	response.status(200).json({ message: 'ok' });

	console.log(request.body);

	alertsNsp.to(url).emit("order_alert", { hello: "world" });
	// console.log(response);
});

module.exports =  router