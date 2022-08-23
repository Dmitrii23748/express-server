import { Router } from "express";
import { allPosts } from "../controllers/allPosts.js";

const router = new Router();


router.get("/allposts", allPosts);

export default router;