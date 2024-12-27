
import { videoModel } from '../Models/video.js'

export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, thumbnail, videoType } = req.body;

    const videoUpload = new videoModel({ user: req.user._id, title, description, videoLink, thumbnail, videoType });
    await videoUpload.save();

    res.status(201).json({ success: "true", videoUpload });
  }
   catch (error) {
    res.status(500).json({ error: "Server Error" })
  }
}

export const getVideos = async (req, res) => {
  try {
      const videos = await videoModel.find().populate('user','channelName profilePic userName createdAt');
      res.status(201).json({success:'true', "videos":videos})
  }
   catch (error) {
    res.status(500).json({ error: "Server Error" })
  }
}

export const getVideoById = async(req,res) => {
  try{
      const {id}= req.params;
      const video = await videoModel.findById(id).populate('user','channelName profilePic userName createdAt');

      res.status(201).json({success:'true','video':video})
  }
  catch(error){
    res.status(500).json({ error: "Server Error" })
  }
}

export const getVideoByUserId = async(req,res) => {
  try{
       const {userId} = req.params;
       const video = await videoModel.find({user:userId}).populate('user','channelName profilePic userName createdAt about');

       res.status(201).json({success:'true', 'video':video});
  }
  catch(error){
    res.status(500).json({ error: "Server Error" })
  }
}