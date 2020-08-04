const router = require('express').Router();
let User = require('../models/user.models')

router.route('/').get((req,res)=> { //if get request with route '/'
    User.find() // mongose gets all users in db
    .then(users => res.json(users)) //return users in json format
    .catch(err => res.status(400).json('Error:' + err)); //else error
});


router.route('/add').post((req,res)=> { //if post request with /add
    const username = req.body.username; //body of req is username
    const name = req.body.name;
    const newUser = new User({username, name}); // new user object instance  with this username
    
    newUser.save() //saved to db
        .then(() => res.json('User added!'))  //return in json
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req,res)=> { //if get request with route '/'
    user.findById(req.params.id) // mongose gets all users in db
    .then(user => res.json(user)) //return users in json format
    .catch(err => res.status(400).json('Error:' + err)); //else error
});

router.route('/:id').delete((req,res)=> { //if get request with route '/'
    user.findByIdAndDelete(req.params.id) // mongose gets all users in db
    .then(() => res.json("User Deleted")) //return users in json format
    .catch(err => res.status(400).json('Error:' + err)); //else error
});

router.route('/update/:id').post((req,res)=> { //if get request with route '/'
    user.findById(req.params.id) // mongose gets all users in db
    .then(user =>{
        user.username = req.body.username;
        user.name = req.body.name;
        user.imageURL = req.body.imageURL;
        //user.favorite_bars = req.body.favorite_bars;
        //user.favorite_drinks = req.body.favorite_drinks;

        user.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.json.status(400).json('Error: ' + err));
});

module.exports = router; //exporting the router