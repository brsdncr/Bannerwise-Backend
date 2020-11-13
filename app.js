const express = require('express');
const app = express();

const mongoose = require('./database/mongoose');
const Keyframe = require('./database/models/keyframe');
const Timeline = require('./database/models/timeline');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(express.json());

//Timeline
//Get all timelines
app.get('/timeline', (req, res) => {
    Timeline.find({})
        .then(timelines => res.send(timelines))
        .catch((error) => console.log(error))
})

//Get single timeline by ID
app.get('/timeline/:timelineId', (req, res) => {
    Timeline.find({ _id: req.params.timelineId})
        .then(timelines => res.send(timelines))
        .catch((error) => console.log(error))
})

//Edit timeline
app.patch('/timeline/:timelineId', (req, res) => {
    Timeline.findOneAndUpdate({ _id: req.params.timelineId}, { $set: req.body })
        .then(timeline => res.send(timeline))
        .catch((error) => console.log(error))
})

//Create timeline
app.post('/timeline', (req, res) => {
    new Timeline({
        title: req.body.title,
        delay: req.body.delay,
        duration: req.body.duration
    })
    .save()
    .then((list) => res.send(list))
    .catch((error) => console.log(error));
})

//Delete timeline
app.delete('/timeline/:timelineId', (req, res) => {
    //Delete Keyframes
    const deleteKeyframes = (timeline) => {
        Keyframe.deleteMany({ _timelineId: timeline._id })
        .then(() => {timeline})
        .catch((error) => console.log(error))
    };

    //Delete Timeline
    const timeline = Timeline.findByIdAndDelete(req.params.timelineId)
    .then((timeline) => {deleteKeyframes(timeline)})
    .catch((error) => console.log(error))

    res.send(timeline)

})

//Keyframes
//All keyframes by timeline
app.get('/timeline/:timelineId/keyframe', (req, res) => {
    Keyframe.find({ _timelineId: req.params.timelineId })
        .then(keyframes => res.send(keyframes))
        .catch((error) => console.log(error))
})

app.post('/timeline/:timelineId/keyframe', (req, res) => {
    new Keyframe({
        _timelineId: req.params.timelineId,
        delay: req.body.delay,
        duration: req.body.duration
    })
    .save()
    .then((keyframe) => res.send(keyframe))
    .catch((error) => console.log(error));
})

app.get('/timeline/:timelineId/keyframe/:keyframeId', (req, res) => {
    Keyframe.findOne({ _timelineId: req.params.timelineId, _id: req.params.keyframeId })
        .then(keyframes => res.send(keyframes))
        .catch((error) => console.log(error))
})

app.patch('/timeline/:timelineId/keyframe/:keyframeId', (req, res) => {
    Keyframe.findOneAndUpdate({ _timelineId: req.params.timelineId, _id: req.params.keyframeId}, { $set: req.body })
        .then(keyframe => res.send(keyframe))
        .catch((error) => console.log(error))
})

//Delete keyframe
app.delete('/timeline/:timelineId/keyframe/:keyframeId', (req, res) => {
    
    Keyframe.findByIdAndDelete(req.params.keyframeId)
    .then((keyframe) => {res.send(keyframe)})
    .catch((error) => console.log(error))

})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})