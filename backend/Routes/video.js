import express from "express";
import { getVideoById, getVideoByUserId, getVideos, uploadVideo } from "../Controllers/video.js";
import {auth} from "../Middleware/authentication.js"

export const videoRoutes = express.Router();

videoRoutes.post('/video', auth, uploadVideo);
videoRoutes.get('/allvideos',getVideos);
videoRoutes.get('/getVideoById/:id', getVideoById);
videoRoutes.get('/:userId/channel', getVideoByUserId);