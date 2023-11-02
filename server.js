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

//CHAT TO DELETE NAN
// Add a new route to delete entries with "null" stageName, "null" birthName, and "NaN" likes
app.delete('/deleteNullOrNaNRapper', (req, res) => {
    const stageNames = req.body.stageName;
    const birthName = req.body.birthName;
    const likes = req.body.likes;

    console.log('Received DELETE request with data:');
    console.log('Stage Name:', stageName);
    console.log('Birth Name:', birthName);
    console.log('Likes:', likes);

    // Check if stageName is "null," birthName is "null," and likes is "NaN"
    if (stageName === 'null' && birthName === 'null' && isNaN(likes)) {
        console.log('Deleting rapper entry...');
        db.collection('rapperNames').deleteOne({ stageName, birthName, likes })
            .then(result => {
                console.log('Rapper Deleted');
                res.json('Rapper Deleted');
            })
            .catch(error => console.error('Error deleting rapper:', error));
    } else {
        // Handle the case where stageName, birthName, or likes are not in the expected state
        console.log('Invalid data for deletion.');
        res.json('Invalid data for deletion.');
    }
});

//ROUTE : app.listen 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Sever is running on port ${PORT}`)
})