const mongoose = require('mongoose');
const bars = require('./bars.models');
const {ObjectId} = require('mongodb');
const {barSchema} = require(__dirname +'/bars.models.js').schema;
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    drink_count: {type: Number},
    bar: {
        type: mongoose.Schema.ObjectId,
        ref: "bar"}
},{
    
});



const drinks = mongoose.model('drinks', drinkSchema);

module.exports = drinks;