const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const {barSchema} = require(__dirname +'/bars.models.js').schema;
const {drinkSchema} = require(__dirname +'/drinks.models.js').schema;
var bars = mongoose.model("bars", barSchema);
var drinks = mongoose.model("drinks", drinkSchema);
const Schema = mongoose.Schema;
const userSchema = new Schema({
    
    username:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    imageURL:{
        type: Buffer,
        contentType: String
    },
    wallet:{
        type: Number,
        required: true,
        default: 0.00
    },
    favorite_bars:{
        drinks : [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "bars"}
        ]
    },
    favorite_drinks : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "drinks"  
        }
    ]




},{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;