const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');
require('dotenv').config();
app.set('view engine','ejs');
app.set('views',__dirname+'/view');
///console.log('======='+process.env.DATABASE);
// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('DB Connected'));
app.use(bodyParser.json());
const userRoutes = require('./routes/user');
// routes middleware
// viewed at http://localhost:8080

app.use('/', userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});