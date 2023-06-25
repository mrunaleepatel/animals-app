const mongoose = require('./connection');

const animalsSchema = new mongoose.Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
});

const Animals = mongoose.model('animal', animalsSchema);

module.exports = Animals;