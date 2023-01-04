require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const middleFuncton = (req, res,next)=>{
    console.log('middleware')
    req.name = 'talal'
    next()
}

app.get('/middle', middleFuncton, (req, res)=>{
    res.send("Home" + req.name)
})

app.get('/home', (req, res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.get('/circle', (req, res)=>{
    res.sendFile(__dirname+'/circle.html')
})
app.get('/rectangle', (req, res)=>{
    res.sendFile(__dirname+'/rectangle.html')
})

app.post('/circle', (req, res)=>{
    const radius = req.body.radius
    const area = Math.PI*radius*radius
    res.send(`${area}`)
})

app.post('/rectangle', (req, res)=>{
    const height = req.body.height
    const width = req.body.width
    const area = height*width
    res.send(`${area}`)
})

app.get('/name/:id([0-9]{2})', (req, res)=>{
    res.send(`${req.params.id}`)
})

app.get('*', (req, res)=>{
    res.send("No Page FOund")
})

app.listen(port, (req,res)=>{
    console.log(`Server running at http://localhost:${port}`)
})
