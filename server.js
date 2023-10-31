// all the consts & requirements
const express = require('express')
const app = express()
const PORT = 8080


//connection to database


//all the app.use & app.set
app.use(express.json())
app.use(express)


//ROUTE : app.get('/'...) + .catch(error => console.error(error))




//ROUTE : app.post + .catch(error => console.error(error))




//ROUTE : app.put with define object you want back + .catch(error => console.error(error))




//ROUTE : app.delete + .catch(error => console.error(error))




//ROUTE : app.listen 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Sever is running on port ${PORT}`)
})