import express from "express";
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai";

dotenv.config()

const dalleRoutes = express.Router()

const configuration = new Configuration({
    apiKey: process.env.OPENAPI_KEY
})

const openapi = new OpenAIApi(configuration)

dalleRoutes.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
})

dalleRoutes.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body

        const aiResponse = await openapi.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
          });

        const image = aiResponse.data.data[0].b64_json
        res.status(200).json({ photo: image})
    } catch (error) {
        console.log(error)
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
})

export default dalleRoutes