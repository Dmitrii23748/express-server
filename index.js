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

const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME

app.use('/api/auth', authRegistr);

app.use("/api/posts", postsPage);

const startServer = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.v2ea6.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
        app.listen( PORT, () => {
            console.log(`server start port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
startServer()
