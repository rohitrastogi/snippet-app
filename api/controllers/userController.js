import User from '../models/User'

const getUserByUsername  = function(username){
    return User.find({ username:username }).exec();
}

const createUser = function(username, password){
    let newUser = new User({ username: username, passord: password});
    return newUser.save().exec();
}

export default {
    getUserByUsername,
    createUser
};