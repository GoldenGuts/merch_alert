const express = require('express')
const router = express.Router()
const shell = require('shelljs')

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

router.get('/generate', (req, res)=>{ 
    res.render('generatePage', { 
        title: "Generating Links for Streamers"
    });
})

router.post('/git-pull', (req, res)=>{
    shell.exec('cd /home/forthefans/backend && git reset HEAD~1 –-hard && git pull && pm2 restart index.js')
    res.status(200).json({message: "okay"})
})

module.exports = router