//Node Modules
const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Set Up A New App
const app = new express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));

//Import Routes
const userController = require('./Controllers/user')(express);
const movieController = require('./Controllers/movie')(express);
const reviewController = require('./Controllers/review')(express);

//Routes
app.use('/api/users', userController);
app.use('/api/movies', movieController);
app.use('/api/reviews', reviewController);


//dbConnect
const dbConnect = async () => {
    try {
        await mongoose.connect(config.get('mongoUrl'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        console.log(`Connected to mongoDb successfully at : ${config.get('mongoUrl')}`);
        let port = process.env.PORT || config.get('port');
        app.listen(port, () => console.log(`Listening on port ${port}!`));
    }
    catch (err) { console.log(err) }
}
dbConnect();

module.exports = app;






