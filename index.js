const express = require('express')
const exphbs  = require('express-handlebars');
const https = require('https');
const fs = require('fs');
const path = require('path')
const app = express();
const fetch = require('node-fetch')

const port = process.env.PORT || 3000;
const server = require('http').createServer(app);

const httpsServer = https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
}, app);

//For running on Website
const io = require("socket.io")(httpsServer);

const alertsNsp = io.of('/alerts');

io.on('connection', socket => {
  
  console.log("Inside Main IO")
  
  socket.on("test_alert", data => {
    const { pool } = require('./mysql_config/config')
    let sql = `SELECT * FROM merch_alert WHERE name=?`;
    pool.getConnection(function(err, connection) {
      connection.query(sql, data.toString().toUpperCase(), (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        if(!results.length) {
          console.log('Wrong Name')
        }
        else {
          const streamer_url = results[0].complete_url;
          
          alertsNsp.to(streamer_url).emit("order_alert", { product: "T-Shirt", name: "Customer", note: "This is the test Script BWHWHHAHAHHA SHOUTTTOUTTTTTTT" })
        }
        console.log(pool._freeConnections.indexOf(connection)); // -1
        connection.release();
        console.log(pool._freeConnections.indexOf(connection)); // 0
      })
    })
  })
})
  
alertsNsp.on('connection', socket => {
    console.log("Inside Alert IO")
    
    socket.on("streamer_url", url =>{
      console.log("Inside Streamer URL")
      console.log(url)
      socket.join(url)
    });
})
//For running local
// const io = require("socket.io")(server);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('socketio', io);

app.use(express.text());
app.use(express.json()); 
app.use(express.static(__dirname + "/public"))
app.use('/', require('./routes/base.js'))
app.use('/alerts', require('./routes/alert.js'))
app.use('/', require('./routes/webhook'))
app.use('/', require('./routes/data'))

//HTTPS for the website
httpsServer.listen(port, () => {
  console.log('HTTPS Server running on port 3000');
});

// HTTP for the loca env
// server.listen(4000, () => {
//   console.log(`listening on *:${4000}`);
// });