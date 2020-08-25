const router = require('express').Router();
let User = require('../models/user.models');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const {Client , Status} = require("@googlemaps/google-maps-services-js");

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
        user.favorite_bars = [];
        user.favorite_drinks = [];

        user.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.json.status(400).json('Error: ' + err));
});

// added code for the routes set up

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });
  
    const client = new Client({});
    async ()=> await client.elevation({
        params: {
          locations: [{ lat: 45, lng: -110 }],
          key: "AIzaSyDCfLMM94TUmn5sHyx_uwpu4AWDt1I_xPA",
        },
        timeout: 1000, // milliseconds
      })
      .then((r) => {
         console.log(r.data.results[0].elevation);
      }) 
      .catch((e) => {
        console.log(e.response.data.error_message);
      }); 
      

module.exports = router; //exporting the router
