import { express } from "express";
import { router } from "express";

const Url = require("./models/Url");

// @route GET /:code
// @desc  Redirect to show

 router.get('/:code', async (req, res) => {
     try {
         const url = await Url.findOne({urlCode: req.params.code});
         if(url){
             return res.redirect(url.shortUrl);
         } else{
             return res.status(404).json('No url found for this code');
         }
     } catch (error) {
         console.error(error.message);
         
     } 
    });


export default router;