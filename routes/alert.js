const express = require('express')
const path = require('path')
const main = require('../data/alert_data.json')
// const test = require('../src/prac')

const router = express.Router();

router.get('/:name', (req, res)=>{

	var io = req.app.get('socketio');
	io.on('connection', (socket) => {
		console.log("Socket IO");
		io.emit('Hello');
		io.emit('message', 'inside this')
	});

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