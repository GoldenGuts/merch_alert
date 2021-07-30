const { response } = require('express');
const express = require('express')
const path = require('path')
const main = require('../data/alert_data.json')
// const test = require('../src/prac')

const router = express.Router();

router.get('/:name', (req, res)=>{

	var io = req.app.get('socketio');

	//socket rooms
	//


	
	const note = response.body.customer_note
	const streamer = response.body.line_items[0].sku.slice(0,4)
	const product  = response.body.line_items[0].sku.slice(0,5)
	const buyer = response.body.billing.first_name

	io.on("test_alert", message => {
		console.log("Inside TestAlert")
		socket.to(message.url).emit("item_bought", {hello: "world"});
	})
	// TODO 
	// Find if name exist in streamers.json
	// Math.random().toString(36).slice(2);
	
	let emptyPage = 0;
 
	if(emptyPage == 1)
	{    
	    res.render('blankPage');
	}

	res.render('alertMain', {
	    name: main[0].client,
	    product: main[0].product
	});
	
	// res.sendFile(path.join(__dirname, '../templates/blogPage.html'))
})

module.exports = router