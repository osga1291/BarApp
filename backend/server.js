const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser:true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection sucessful");
})
const drinksRouter = require('./routes/drinks') ;
const barsRouter = require('./routes/bars');
const usersRouter = require('./routes/users');
const passport = require("passport");

<<<<<<< HEAD
// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use('/drinks', drinksRouter);
=======
app.use('/bars/:id', drinksRouter);
>>>>>>> bab72e7a0d244d40f1805780c4dc7d74a9d541d5
app.use('/bars',barsRouter);
app.use('/users',usersRouter);




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
