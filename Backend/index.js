const express=require('express')
const app=express()
const port=4000
const mongoose=require('mongoose')
const cors = require('cors');


app.use(express.json())
app.use(cors());

const homePath=require('./Routes/homeRoute')
const servicePath=require('./Routes/serviceRoute')
const projectPath=require('./Routes/ProjectRoute')
const contactPath=require('./Routes/contactRoute')
const aboutPath = require('./Routes/aboutRoute');


////////////////connection///////////////
mongoose.connect("mongodb+srv://sama21mohammed:6VYWdwTLd3DBb7x0@cluster0.kuo1j0r.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0")
        .then(()=>{console.log("Connection success")})
        .catch((error)=>console.log("connection Failed"))

//////////////////////////   


app.use('/home',homePath)
app.use('/service',servicePath)
app.use('/project',projectPath)
app.use('/contact',contactPath)
app.use('/about',aboutPath)
app.use('/images',express.static('./img'))

const path = require('path');
app.use(express.static(path.join(__dirname, 'dist/potrfolio')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/potrfolio/index.html'));
});





app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})
