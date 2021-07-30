const express = require('express')
const router = express.Router()

router.post('/get_data', (request,response) => {

	console.log('this ran');

	response.status(200).json({ message: 'ok' });
	
	console.log(request.body);

	io.to(sku).emit("item_bought", { hello: "world" });
	// console.log(response);
});

module.exports =  router