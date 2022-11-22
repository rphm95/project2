const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Attraction = require('./attractions.js')

const travelSchema = new Schema ({
    img: {type: String},
    location: {type: String, required: true},
    food: [{type: String}],
    flightPrice: {type: String},
    hotelPrice: {type: String},
    description: {type: String},
    bookingLink: {type: String},
    attractions: [Attraction.schema]

}, {timestamps: true})

const Location = mongoose.model('Location', travelSchema)

module.exports = Location;