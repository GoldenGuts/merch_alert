const express = require('express')
var exphbs  = require('express-handlebars');
const https = require('https');
const fs = require('fs');
const path = require('path')
const app = express()
const port = 3000

const httpsServer = https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
}, app);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + "/public"))
app.use('/', require('./routes/base.js'))
app.use('/', require('./routes/alert.js'))

// httpsServer.listen(port, () => {
//   console.log('HTTPS Server running on port 3000');
// });

app.listen(port, () => {
  console.log('hello')
})
