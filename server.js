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


// app.get('/', (req, res) => {
//     const data = { message: 'Hello, EJS!' };
//     res.render('index', data);
// });


//ROUTE : app.get('/'...) + .catch(error => console.error(error))
app.get('/', (req, res)=>{
    db.collection('rapperNames').find().sort({likes: -1}).toArray()
    .then(data => {
        res.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
})



//ROUTE : app.post + .catch(error => console.error(error))




//ROUTE : app.put with define object you want back + .catch(error => console.error(error))




//ROUTE : app.delete + .catch(error => console.error(error))




//ROUTE : app.listen 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Sever is running on port ${PORT}`)
})