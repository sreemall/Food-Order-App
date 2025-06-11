const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema ({
    userName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdTs: {
        type: Date,
        default: new Date(),
    },
    updatedTs: {
        type: Date,
        default: new Date(),
    }
});

const UserModel = mongoose.model ("users", userSchema);

module.exports = UserModel;