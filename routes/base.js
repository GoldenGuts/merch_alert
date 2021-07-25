const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('home', { 
        style: "body{ background-color: azure !important;}" ,
        title: "Merch Alert Testing"
    });
})

router.get('/test', (req, res)=>{ 
    res.render('testHome', { 
        title: "Testing CSS Design with Static content"
    });
})

module.exports = router