const fs = require('fs');
const blogJSON = require('./data/blogs.json')
const ap = require('./routes/api')

// console.log(blogJSON);
// console.log(JSON.stringify(blogJSON))

let currentTime = new Date();

currentTime.setMinutes(currentTime.getMinutes() - 5);

// console.log(currentTime.toISOString());

(async () => {
	await ap('processing')
})();
