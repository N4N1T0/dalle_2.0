import express from "express";
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import PostSchema from '../mongodb/models/post.js'

dotenv.config()

// similar to app.METHOD
const postRoutes = express.Router()

// configurating cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETS,
})

postRoutes.route('/').get(async (req, res) => {
    try {
        const post = await PostSchema.find({})

        res.status(200).json({ success: true, data: post })
        
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }

})

postRoutes.route('/').post(async (req, res) => {
   try {

    const { name, prompt, photo } = req.body
    // Uploading first to cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo)

    // thrn creating a document in mongo with the url from cloudinary
    const newPost = await PostSchema.create({
        name,
        prompt,
        photo: photoUrl.url,
    })

    res.status(201).json({ success: true, data: newPost })
    
   } catch (error) {
    res.status(500).json({ success: false, message: error })
   }
})

export default postRoutes
