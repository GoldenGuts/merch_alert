const fs = require('fs');
const blogJSON = require('../data/blogs.json');
const ap = require('./api');
let main = [];

function fillData(orderID, streamer, client, product) {
	const main_data = {};
	main_data.id = orderID;
	main_data.streamer = streamer;
	main_data.client = client;
	main_data.product = product;
	main.push(main_data)
}

// (async () => {
// 	await ap.getOrderDetails('processing').then()
// 	for(let element of ap.productData.variationID) {
// 		await ap.getProductDetails(element).then()
// 	}
// 	for(let e = 0; e < (ap.orderIDs).length; e++) {
// 		fillData(
// 			ap.orderIDs[e], 
// 			ap.productData.streamerName[e], 
// 			ap.firstNames[e], 
// 			ap.productData.productType[e] 
// 		)
// 	}
// })();

async function getMain() {
	await ap.getOrderDetails('processing').then()
	for(let element of ap.productData.variationID) {
		await ap.getProductDetails(element).then()
	}
	for(let e = 0; e < (ap.orderIDs).length; e++) {
		fillData(
			ap.orderIDs[e], 
			ap.productData.streamerName[e], 
			ap.firstNames[e], 
			ap.productData.productType[e] 
		)
	}
}

(async () => {
	await getMain();

	fs.writeFile((__dirname + '/../data/alert_data.json'), JSON.stringify(main), err => {
		if (err) {
			console.log('Error writing file', err)
		} else {
			console.log('Successfully wrote file')
		}
	})
})();

module.exports = getMain;