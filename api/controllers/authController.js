import jwt from 'jsonwebtoken';
import userController from '../controllers/userController'

const createUser = async function(username, password){
    return userController.getUserByUsername(username)
    .then((existingUser) => {
        if (existingUser){
            throw new Error('Username already taken!');
        }
        return userController.createUser(username, password)
    })
    .catch((err) => {
        reject(err);
    })
    .then((user) => {
        const token = createToken(user.id)
        resolve ({
            user,
            token
        });
    })
};
    
const createToken = function(id, username){
    let currDate = new Date();
    let expireDate = new Date(currDate);
    expireDate.setDate(currDate.getDate + 2);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(expireDate.getTime()/1000)
    }, process.env.JWT_SECRET)
};

const verifyJWT = function(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }
            resolve(decodedToken)
        })
    })
};

const verifyUser = function(user, password, token){
    if (!user) {
        throw new Error('Invalid username/password combination');
    }
    return user.comparePassword(password)
    .then((match) => {
        if (match){
            return verifyJWT(token);
        }
        throw new Error('Invalid username/password combination')
    })
    .catch((err) => {
        resolve(err);
    })
}

export default {
    createUser, 
    verifyUser
}