import express from 'express';
import { authenticateMiddleware } from '../middleware/auth'
import snippetController from '../controllers/snippetController';

export default function(app) {
    const userRouter = express.Router();
    
    userRouter.get('/', authenticateMiddleware, async (req, res) => {
        let page = req.page;
        let username = req.user.username;
        let snippets = await snippetController.getUserSnippets(username, page, limit);
        res.json(snippets);
    })

}