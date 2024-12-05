const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LeaveSchema = new Schema({
    // userID: {
    //     type: String,
    //     required: true,
    //     unique:false
    // },
    name: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    dayType: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    appliedOn: {
        type: Date,
        required: true
    }
})

const LeaveModel = mongoose.model("Leave", LeaveSchema)
module.exports = LeaveModel;