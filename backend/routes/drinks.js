const router = require('express').Router();
let drinks = require('../models/drinks.models')

router.route('/').get((req,res)=> { //if get request with route '/'
    drinks.find() // mongose gets all users in db
    .then(drinks => res.json(drinks)) //return users in json format
    .catch(err => res.status(400).json('Error:' + err)); //else error
});


router.route('/add').post((req,res)=> { //if post request with /add
    const username = req.body.username; //body of req is username

    const newUser = new User({username}); // new user object instance  with this username
    
    newUser.save() //saved to db
        .then(() => res.json('User added!'))  //return in json
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router; //exporting the router