const express = require('express')
const path = require('path')
const blogs = require('../data/blogs.json')

const router = express.Router()

router.get('/', (req, res)=>{
    // res.sendFile(path.join(__dirname, '../templates/index.html'))
    res.render('home');
})

router.get('/test', (req, res)=>{ 
    // res.sendFile(path.join(__dirname, '../templates/bloghome.html'))
    res.render('testHome');
})

router.get('/alerts/:name', (req, res)=>{  
    // const myBlog = blogs.filter((e)=>{
    //     return e.name
    // })
    // console.log(myBlog)
    let emptyPage = 0;

    if(emptyPage == 1)
    {    
        res.render('blankPage');
    }

    res.render('alertMain', {
        name: blogs[0].name,
        product: blogs[0].product
    });
    
    
    // res.sendFile(path.join(__dirname, '../templates/blogPage.html'))
})

module.exports = router