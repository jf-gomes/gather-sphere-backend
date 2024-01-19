import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    cel: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    events: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Users', userSchema)