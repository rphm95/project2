const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// HOROKU HAS A ENVORIMENT VARIABLE, and port is a port that horoku will set up... so we create a variable PORT 3000, so if im running locally it runs on PORT 3000 but if its on horoku we assing PORT=process.env.PORT
let PORT= 3000
if(process.env.PORT){
    PORT=process.env.PORT
}


app.get('/', (req, res) => {
    res.send('hi');
})
















//==================== my local port 

app.listen(PORT, () =>{
    console.log('listening...');
})

mongoose.connect('mongodb+srv://rphm95:R160589867@sei.7r3v4df.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo')
})