import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SnippetSchema = new Schema({
    title: {type: String, required: [true, "title is required"]},
    code: {type: String, required: [true, "code body is required"]},
    language: {type: String, required: [true, "language is required"]},
    tags: [String], 
    description: {type: String},
    username: {type: String, required: [true, "User is required"], index = true},
    userID: Schema.Types.ObjectID,
}, {timestamps: true});

let Snippet = mongoose.model('Snippet', SnippetSchema);
export default Snippet;