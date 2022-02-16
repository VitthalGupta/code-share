import { mongoose } from "mongoose";

const urlSchema= new mongoose.Schema({
    urlCode: String,
    shortUrl: String,
    data: String,
    date: {type: String, default: Date.now()}
})

export default mongoose.model("url", urlSchema);