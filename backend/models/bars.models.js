const mongoose = require('mongoose');
const drinks = require('./drinks.models');
//const {drinkSchema} = require(__dirname +'/drinks.models.js').schema;
//var drinks = mongoose.model("drinks" , drinkSchema);
const Schema = mongoose.Schema;
// the model fields
const barsSchema = new Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    drinks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "drinks"
        }
    ]
},{
    
});



const Bar = mongoose.model('bars', barsSchema);

module.exports = Bar;