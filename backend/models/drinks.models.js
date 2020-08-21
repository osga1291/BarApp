const mongoose = require('mongoose');
const bars = require('./bars.models');
const {ObjectId} = require('mongodb');
const {barSchema} = require(__dirname +'/bars.models.js').schema;
const Schema = mongoose.Schema;




const drinkSchema = new Schema({
    name: {type: String},
    price: {type: Number},
    drink_count: {type: Number},
    bar: {
        type: Schema.Types.ObjectId,
        ref: "bars",
        }
    }
)




const drinks = mongoose.model('drinks', drinkSchema);

module.exports = drinks;