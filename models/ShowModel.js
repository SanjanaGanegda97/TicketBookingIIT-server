const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShowSchema = new Schema({
    userID: {
        type: String,  // Assuming userID refers to a user in another collection
        required: true
    },
    name: {
        type: String,
        required: true
    },
    eventTitle: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,  // Store URL or path to the image
    },
    promotionType: {
        type: String,
        enum: ['Early Bird', 'Final Tickets', 'No Promotion'],  // Limited to these options
        required: true
    },
    appliedOn: {
        type: Date,
        default: Date.now  // Automatically set to the current date
    },
    musicBand: {  // New field for music band
        type: String,
        required: true
    },
    ticketPrice: {  // New field for ticket price
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Show', ShowSchema);
