import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {type: String, unique: true, required: [true, "Username is required"], lowercase: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true}
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: "Username must be unique!"});

UserSchema.pre('save', (next) => {
    if (!this.isModified('password')) return next();
    bcrypt.hash(this.password, SALT_WORK_FACTOR).then((hash) =>{
        this.password = hash;
    }, (error) => {
        next();
    });
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const match = await bcrypt.compare(candidatePassword, this.password);
    return match;
}

let User = mongoose.model('User', UserSchema);
export default User;