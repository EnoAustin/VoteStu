const mongoose = required('mongoose')
const voteSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Type.ObjectId,
        ref:'Student',
        required: true
    },
    candidate:{
        type: mongoose.Schema.Type.ObjectId,
        ref:'Candidate',
        required: true
    },
    election: {
        type: mongoose.Schema.Type.ObjectId,
        ref:'Election',
        required: true
    },
    post: {
        type: String,
        required: true
    },
    steganographyImage: {
        type: String,
        default: null
    },
    isEncoded: {
        type: Boolean,
        default: false
    }
}, 
{timestamps: true})

voteSchema.index({student: 1, election:1, post: 1}, {unique: true})

const Vote = mongoose.model('Vote', voteSchema)

module.exports = Vote