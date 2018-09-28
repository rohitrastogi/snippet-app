import { verifyJWT } from '../controllers/authController';

export function authenticateMiddleware(req, res, next){
    let token = (req.method === 'POST') ? req.body.token : req.query.token

    verifyJWT(token)
    .then((decodedToken) => {
        req.user = decodedToken.data;
        next();
    })
    .catch((err) => {
        res.status(400).json({message: "Invalid auth token provided."})
    })
}