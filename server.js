// all the consts & requirements
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const PORT = 8080
require('dotenv').config()
const ejs = require('ejs')

//connection to database
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "RapperNamesDB";


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })    
//all the app.use & app.set
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())




//ROUTE : app.get('/'...) + .catch(error => console.error(error))
app.get('/', (req, res)=>{
    db.collection('rapperNames').find().sort({likes: -1}).toArray()
    .then(data => {
        res.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
});



//ROUTE : app.post + .catch(error => console.error(error))
app.post('/addRapper', (req, res) => {
    db.collection('rapperNames').insertOne({stageName: req.body.stageName,
    birthName: req.body.birthName, likes: 0})
    .then(result => {
        console.log('Rapper Added')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})



//ROUTE : app.put with define object you want back + .catch(error => console.error(error))
app.put('/addOneLike', (req, res) => {
    db.collection('rapperNames').updateOne({stageName: req.body.stageName,
    birthName: req.body.birthName, likes: req.body.likes},{
    $set: {
        likes: req.body.likes + 1
    }
},{
    sort: {_id: -1},
    upsert: true
})
.then(result => {
    console.log('Added One Like')
    res.json('Like Added')
})
.catch(error => console.error(error))

})

//ROUTE : app.delete + .catch(error => console.error(error))
app.delete('/deleteRapper', (req, res) => {
    db.collection('rapperNames').deleteOne({stageName: req.body.stageName})
    .then(result => {
        console.log('Rapper Deleted')
        res.json('Rapper Deleted')
    })
    .catch(error => console.error(error))

})


//ROUTE : app.listen 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Sever is running on port ${PORT}`)
})

//COPY ROUTE : app.listen 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Sever is running on port ${PORT}`)
})

//COPY ROUTE : app.listen 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Sever is running on port ${PORT}`)
})




