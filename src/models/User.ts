import mongoose, { Schema, Document } from "mongoose";



export interface IUserModel extends Document {
    name: string,
    password: string,
    email: string
}

const UserSchema: Schema = new Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true,
    },

}, {
    versionKey: false
});

export default mongoose.model<IUserModel>("User", UserSchema);