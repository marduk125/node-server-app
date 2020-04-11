const express=require('express')
const hbs=require('hbs')
const fs=require('fs')
var app=express(); 

hbs.registerPartials(__dirname+'/views/parts')
app.set('view engine','hbs')

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err,data)=>{
        if(err){
            console.log('error appending to file')
        }
    })
    next()
})
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs')
// })


app.use(express.static(__dirname+'/public'))

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'welcome in new page'
    })
  
    /*  res.send({
        name:'Mahdi',
        likes:[
            'Football',
            'Basketball'
        ]
    })*/
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
    })
})
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to find page'
    })
})

app.listen(3000,()=>{
    console.log('server is up')
})