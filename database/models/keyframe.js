const mongoose = require('mongoose');

const KeyframeSchema = new mongoose.Schema({
    _timelineId: {
        type: mongoose.Types.ObjectId,
        required: true
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

const Keyframe = mongoose.model('Keyframe', KeyframeSchema);

module.exports = Keyframe;