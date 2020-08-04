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
        .then(() => res.json('Drink added!'))  //return in json, change to dinks*
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req,res)=> { //if get request with route '/'
    drinks.findById(req.params.id) // mongose gets all users in db
    .then(drinks => res.json(drinks)) //return users in json format
    .catch(err => res.status(400).json('Error:' + err)); //else error
});

router.route('/:id').delete((req,res)=> { //if get request with route '/'
    drinks.findByIdAndDelete(req.params.id) // mongose gets all users in db
    .then(() => res.json("Drink Deleted")) //return users in json format
    .catch(err => res.status(400).json('Error:' + err)); //else error
});

router.route('/update/:id').post((req,res)=> { //if get request with route '/'
    drinks.findById(req.params.id) // mongose gets all users in db
    .then(drinks =>{
        drinks.username = req.body.username;
        drinks.name = req.body.name;
        drinks.price = Number(req.body.price);
        drinks.description = req.body.description;
        drinks.drink_count = Number(req.body.drink_count);

        drinks.save()
          .then(() => res.json('Drinks updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.json.status(400).json('Error: ' + err));
});

module.exports = router; //exporting the router