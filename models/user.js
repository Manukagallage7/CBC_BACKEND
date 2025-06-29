import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    type: {
    type: String,
    default: "Customer",
    enum: ["Customer", "Admin"],
    }
});

const User = mongoose.model('User', userSchema);

export default User;