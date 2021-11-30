const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const car = new schema({
    brand: { type: String, required: true },
    number: { type: String, required: true },
});

module.exports = mongoose.model('car', car);