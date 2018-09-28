import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SnippetSchema = new Schema({
    _id: Number,
    title: {type: String, required: [true, "title is required"]},
    code: {type: String, required: [true, "code body is required"]},
    language: {type: String, required: [true, "language is required"]},
    tags: [String], 
    description: {type: String},
    user: {type: String, required: [true, "User is required"], index = true}
}, {timestamps: true});

let Snippet = mongoose.model('Snippet', SnippetSchema);
export default Snippet;