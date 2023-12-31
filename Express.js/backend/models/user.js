import mongoose, { Schema } from "mongoose";

const schema = mongoose.Schema;

const userSchema = new Schema(
    {
        full_name: {type: String , required: true},
        email: {type: String , required: true , unique: true},
        password: {type: String , required: true},
        phone_number: {type: String , required: false},
        profile_photo: {type: String , required: false},
        skills: {type: [] , required: true}
    },{
        timeseries: true
    }
);

const User = mongoose.model('User' , userSchema);

export default User;

