import dotenv from 'dotenv'
dotenv.config({ silent: true })
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error!'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//routes
router.get('/', (req, res) => {
    res.json({ message: 'Test' });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));