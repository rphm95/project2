const mongoose = require('mongoose');

const attractionSchema = mongoose.Schema(
    {
        place: {type: String},
        image: {type: String},
        descriptionOfPlace: {type: String},
        price: {type: String}
    }, {timestamps: true}
);

const Attraction = mongoose.model('Attraction', attractionSchema)

module.exports = Attraction;