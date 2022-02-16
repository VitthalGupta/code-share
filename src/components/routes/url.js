import { Express } from "express";
import { router } from "express";
import {shortId} from 'shortid';
import {config} from "config"; 

import Url from './models/Url';

// @route POST api/url/shorten 
// @desc  Shorten URL

router.post('/generate', async (req, res) => {
    const baseUrl = config.get('baseUrl');
    // Create a url code
    const urlCode = shortId.generate();

    //crete a short url
    const shortUrl = baseUrl + '/' + urlCode;
    url = new Url({
        shortUrl,
        urkCode,
        data: req.body.data,
        date: Date.now()
    });
    try {
        await url.save();
        res.json(url);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

    
});

export default router;