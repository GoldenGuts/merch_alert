const express = require('express')
var exphbs  = require('express-handlebars');
const https = require('https');
const fs = require('fs');
const path = require('path')
const app = express();
const port = 3000;
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const httpsServer = https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
}, app);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('socketio', io);

app.use(express.static(__dirname + "/public"))
app.use('/', require('./routes/base.js'))
app.use('/alerts', require('./routes/alert.js'))
app.use('/', require('./routes/webhook'))

// httpsServer.listen(port, () => {
//   console.log('HTTPS Server running on port 3000');
// });

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});