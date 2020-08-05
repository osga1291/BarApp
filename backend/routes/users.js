const router = require('express').Router();
let User = require('../models/user.models');
const { ObjectId } = require('mongodb');

router.route('/all').get((req,res)=> { //if get request with route '/'
    User.find() // mongose gets all users in db
    .then(users => res.json(users)) //return users in json format
    .catch(err => res.status(400).json('Error:' + err)); //else error
});

router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error:' + err));

});


router.route('/add').post((req,res)=> { //if post request with /add
    const username = req.body.username; //body of req is username
    const name = req.body.name;
    const newUser = new User({username, name}); // new user object instance  with this username
    
    newUser.save() //saved to db
        .then(() => res.json('User added!'))  //return in json
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router; //exporting the router