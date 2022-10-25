import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
        require: [true, 'please insert user name']
    },
    password: {
        type: String,
        require: [true, 'please insert password']
    },
    role: {
        type: String,
        default: 'member'
    }

});

export default mongoose.models.User || mongoose.model("User", UserSchema);

