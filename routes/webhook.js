const express = require('express')
const router = express.Router()

router.post('/get_data', (request,response) => {
	//code to perform particular action.
	//To access POST variable use req.body()methods.
	console.log(request.body);
	// console.log(response);
});

module.exports = router