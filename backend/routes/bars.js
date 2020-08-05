const router = require('express').Router();

let Bar = require('../models/bars.models')

router.route('/').get((req,res)=> { //if get request with route '/'
    Bar.find() // mongose gets all users in db
    .then(bars => res.json(bars)) //return users in json format
    .catch(err => res.status(400).json('Error:' + err)); //else error
});

router.route('/:id').get((req,res)=> { //if get request with route '/'
    Bar.findById(req.params.id) // mongose gets all users in db
    .then(bar => res.json(bar)) //return users in json format
    .catch(err => res.status(400).json('Error:' + err)); //else error
});

router.route('/:id').delete((req,res)=> { //if get request with route '/'
    Bar.findByIdAndDelete(req.params.id) // mongose gets all users in db
    .then(() => res.json("Bar Deleted")) //return users in json format
    .catch(err => res.status(400).json('Error:' + err)); //else error
});


router.route('/update/:id').post((req,res)=> { //if get request with route '/'
    Bar.findById(req.params.id) // mongose gets all users in db
    .then(exercise =>{
        bars.username = req.body.username;
        bars.name = req.body.name;
        
    
        
        exercise.save()
        .then(() => res.json("Bar Updated."))
        .catch(err => res.status(400).json('Error:' + err)); //else error
})
    .catch(err => res.status(400).json('Error:' + err));

});

router.route('/add').post((req,res)=> { //if post request with /add
    const username = req.body.username; //body of req is username
    const name = req.body.name;
    
    const newBar = new Bar({
        username,
        name,
    }); 

    newBar.save() //saved to db
        .then(() => res.json('Bar added!'))  //return in json
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router; //exporting the router