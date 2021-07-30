const express = require('express')
const path = require('path')
const { db } = require('../mysql_config/config')
const router = express.Router();

router.get('/:streamer_url', (req, res)=>{

	var io = req.app.get('socketio');

	//socket rooms
	//


	
	// const note = response.body.customer_note
	// const streamer = response.body.line_items[0].sku.slice(0,4)
	// const product  = response.body.line_items[0].sku.slice(0,5)
	// const buyer = response.body.billing.first_name

	io.on("test_alert", message => {
		console.log("Inside TestAlert")
		socket.to(message.url).emit("item_bought", {hello: "world"});
	})
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
                name: 'client',
                product: 'product'
            });
        }    
    });
	
	// res.sendFile(path.join(__dirname, '../templates/blogPage.html'))
})

module.exports = router