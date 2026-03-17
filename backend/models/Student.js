// STUDENT INFO DATA

const mongoose = require('mongoose')
// student personal info
const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    matricule: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        default: null,
        sparse: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: false
    },
    faceEncoding: {
        type: String,
        default: null
    },
    isEnrolled: {
        type: Boolean,
        default: false
    },
    hasVoted:{
        type: Boolean,
        default: false
    },
    isActivated: {
        type: Boolean,
        default: false
    }
},
{timestamps: true }
)
const Student = mongoose.model('Student', studentSchema)
module.exports = Student