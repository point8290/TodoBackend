import mongoose, { Schema, Document } from "mongoose";

export interface IAuth {
    password: string,
    email: string
}

export interface IUserModel extends IAuth, Document {
    name: string
}
export interface ISignup extends IUserModel {
    confirmPassword: string
}

const UserSchema: Schema = new Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true,
    },

}, {
    versionKey: false
});

export default mongoose.model<IUserModel>("User", UserSchema);