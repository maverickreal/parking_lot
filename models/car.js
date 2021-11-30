const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const car = new schema({
    brand: { type: String, required: true },
    number: { type: Number, required: true },
    parkingId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('car', car);