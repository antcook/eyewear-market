var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('Product', new Schema({ 
    brand:       String,
    name:        String,
    gender:      String,
    material:    String,
    description: String,
    colours:     Array,
    images:      Array,
    shape:       String,
    price:       Number,
    slug:        String
}));