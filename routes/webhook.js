const express = require('express')
const router = express.Router()

router.post('/get_data', (request,response) => {
	// code to perform particular action.
	// To access POST variable use req.body()methods.
	// response.set('Content-Type', 'text/plain')
	console.log('this ran');
	response.status(200).json({ message: 'ok' });
	console.log(request.body);
	// console.log(response);
});

module.exports = router