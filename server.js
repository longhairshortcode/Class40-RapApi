// all the consts & requirements
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const PORT = 8080


//connection to database
let db,
    dbConnectionStr = process.env.DB_STRING
    dbName = "myRapNamesApi"

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })    
//all the app.use & app.set
app.use(express.json())
app.use(express)


//ROUTE : app.get('/'...) + .catch(error => console.error(error))
app.get('/', (req, res)=>{
    db.collection('rappers').find().sort({likes: -1}).toArray()
    .then(data => {
        respond.render('index.ejs', {info: data})
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