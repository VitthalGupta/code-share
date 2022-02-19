const express = require("express");
const { default: mongoose } = require("mongoose");
// recordRoutes is an instance of the express router.
// The router will be added as a middleware and will take control of requests starting with path /record.
const urlRoutes = express.Router();
const axios = require("axios");
//connect to the database
const dbo = require("../db/conn");

// importing models
const Url = require("../models/model");

// This route will help you get a url by id
urlRoutes.route("/show/:code").get(function (req, res) {
  const ip = req.headers["x-forwaded-for"] || req.socket.remoteAddress || null;
  console.log(ip);
  const currentTimeStamp = new Date().getTime();
  Url.findOneAndUpdate(
    { urlCode: req.params.code },
    { $push: { clientIps: { ip: ip, timestamp: currentTimeStamp } } }
  ).then((response) => {
    let myquery = { urlCode: req.params.code };
    Url.find(myquery, function (err, url) {
      if (err) {
        res.send(err);
      } else {
        console.log(url);
        res.send(url);
      }
    });
  });
});

urlRoutes.route("/urlList").get(function (req, res) {
  let CuTimeStamp = new Date();
  Url.find({ validity: { $gt: CuTimeStamp } }).then((response) => {
    res.status(200).json(response);
  });
});
// const calc = (date) => {
//     let d = new Date(date);
//     d.setDate(d.getDate() + 1);
//     return d;
//   };
urlRoutes.route("/modify-date/:code/").get(function (req, res) {
  let myquery = { urlCode: req.params.code };
  Url.findOneAndUpdate(
    myquery,
    {
      $set: {
        expiration: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      },
    },
    null,
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Original Doc : ", docs);
      }
    }
  );
});

urlRoutes.route("/decrypt/:code").get(function (req, res) {
  let myquery = { urlCode: req.params.code };
  Url.find(myquery, function (err, url) {
    console.log(url[0].pasteData);
    const decrypt_api = "https://classify-web.herokuapp.com/api/decrypt";
    axios
      .post(decrypt_api, {
        data: url[0].pasteData,
        key: url[0].encryptkey,
      })
      .then((resp) => {
        console.log(resp.data.result);
        res.send(resp.data.result);
      });
  });
});

// This section will help you create a new record.
urlRoutes.route("/").post(function (req, response) {
  console.log(req.body);
  if (req.body.encrypt == true) {
    const encrypt_api = "https://classify-web.herokuapp.com/api/encrypt";
    axios
      .post(encrypt_api, {
        data: req.body.pasteData,
        key: req.body.encryptkey,
      })
      .then((resp) => {
        let myobj = new Url({
          urlCode: req.body.urlCode,
          shortUrl: req.body.shortUrl,
          pasteData: resp.data.result,
          date: new Date(),
          expiration: req.body.expiration,
          encrypt: req.body.encrypt,
          encryptkey: req.body.encryptkey,
        });
        myobj.save(function (err, result) {
          if (err) throw err;
          response.json(result);
        });
      });
  } else {
    let myobj = new Url({
      urlCode: req.body.urlCode,
      shortUrl: req.body.shortUrl,
      pasteData: req.body.pasteData,
      date: new Date(),
      expiration: req.body.expiration,
      encrypt: req.body.encrypt,
      encryptkey: req.body.encryptkey,
    });
    myobj.save(function (err, result) {
      if (err) throw err;
      response.json(result);
    });
  }
});

// This section will check for expiration and delete the url if expired.
urlRoutes.route("/delete/:code").get((req, response) => {
  let myquery = { urlCode: req.params.code };
  Url.deleteOne(myquery, function (err, res) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(res);
  });
});

urlRoutes.route("/urlList/view/:code").get( (req,res)=>{
  Url.find({urlCode: req.params.code}).then((response)=>{
    console.log(response[0].clientIps);
    res.status(200).json(response[0].clientIps);
  })
})

module.exports = urlRoutes;
