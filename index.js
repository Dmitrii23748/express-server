// mern mern123
import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRegistr from './routes/auth.js';
import postsPage from './routes/posts.js';



const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

// const PORT = process.env.PORT;
// const DB_USER = process.env.DB_USER;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_NAME = process.env.DB_NAME

app.use('/api/auth', authRegistr);

app.use("/api/posts", postsPage);

const MONGO_DB = process.env.MONGO_DB

// mongodb+srv://mern:mern123@cluster0.v2ea6.mongodb.net/mern-js?retryWrites=true&w=majority
const startServer = async () => {
    try {
        await mongoose.connect(MONGO_DB);
        app.listen( process.env.PORT || 4444, () => {
            console.log(`server start`);
        })
    } catch (error) {
        console.log(error);
    }
}
startServer()
