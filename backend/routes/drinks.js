const router = require('express').Router();
let drinks = require('../models/drinks.models');
const { ObjectId } = require('mongodb');
let Bar = require('../models/bars.models');

router.route('/allDrinks').get((req,res)=>{
    Bar.findById(req.params.id)
    .then(bar => res.json(bar.drinks))
    .catch(err => res.status(400).json('Error:' + err));
});


router.route('/:id/addDrink').post((req,res)=> {
    const newDrink = new drinks();
    newDrink.name = req.body.name;
    newDrink.price= req.body.price;
    newDrink.drink_count = 0;
    newDrink.save()
    
        .then(() =>{
            Bar.findById((req.params.id),(err,bar) => {
                if(bar){
                    
                    bar.drinks.push(newDrink._id);
                    
                    bar.save();
                    console.log(newDrink);
                    console.log(bar);
                    res.json("Drink Created");
                }
                else{
                    throw(err);}
            
                });
            })
        .catch((error) => {
            res.status(500).json(error);
        });

    
});

router.route('/drinks/:id').delete((req,res)=> { //if get request with route '/'
    drinks.findByIdAndDelete(req.params.id) // mongose gets all users in db
    .then(() => res.json("Drink Deleted")) //return users in json format
    .catch(err => res.status(400).json('Error:' + err)); //else error
});

router.route('/:id/updateDrink').put((req,res)=> {
    
    
    
    
    
    
    const newDrink = new drinks();
    newDrink.name = req.body.name;
    newDrink.price= req.body.price;
    newDrink.drink_count = req.body.drink_count;
    newDrink.bar = req.params.id;


    
});

module.exports = router; //exporting the router