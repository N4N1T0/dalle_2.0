import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true)

    mongoose.connect(url)
    .then(() => console.log('mongoDB Connect'))
    .catch((err) => {
        console.error('failed to connect with mongo');
        console.error(err);
      });

}


export default connectDB;