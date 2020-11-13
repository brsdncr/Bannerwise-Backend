const mongoose = require('mongoose');

const TimelineSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    delay: {
        type: Number,
        default: 0,
        required: true
    },
    duration: {
        type: Number,
        default: 0,
        required: true
    }
});

const Timeline = mongoose.model('Timeline', TimelineSchema);

module.exports = Timeline;