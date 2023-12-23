import mongoose, { Schema, Document } from "mongoose";

export interface ITodoModel extends Document {

}

const TodoSchema: Schema = new Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    dueDate: {
        type: Date, required: true
    },
    completed: {
        type: Boolean, default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }

}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model<ITodoModel>("Todo", TodoSchema);