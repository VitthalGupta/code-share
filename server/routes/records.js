const express = require("express");
const { default: mongoose } = require("mongoose");
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const urlRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// importing models
const Url = require("../models/model");

async function encrypt(data,key){
  try {
    const url = 'https://classify-web.herokuapp.com/api/encrypt';
    const jsonData = JSON.stringify({ 
            data: data , key: key
        });
    let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: jsonData
        });
        const result = await response.json();
        console.log(result);
        return result;
  } catch (error) {
    console.log(error);
  }
}

// This section will help you get a url by id
urlRoutes.route("/show/:code").get(function (req, res) {
  let myquery = { urlCode: req.params.code };
  Url.find(myquery, function (err, url) {
    if (err) {
      res.send(err);
    } else {
      console.log(url);
      res.send(url);
  };
});});

// This section will help you create a new record.
urlRoutes.route("/").post(function (req, response) {
  console.log(req.body);
  let myobj = new Url({ 
    urlCode: req.body.urlCode,
    shortUrl: req.body.shortUrl,
    pasteData: req.body.pasteData,
    date: new Date(),
    expiration: req.body.expiration,
    encrypt: req.body.encrypt,
    encryptkey: req.body.encryptkey
  });
  if (req.body.encrypt === 'true'){
    myobj.pasteData = encrypt(req.body.pasteData, req.body.encryptkey);
  }
  myobj.save(function (err, result) {
    if (err) throw err;
    response.json(result);
  });
});

// // This section will help you update a url by id.
// urlRoutes.route("/update/:code").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myquery = { urlCode: req.params.code };
//   let newvalues = {
//     $set: {
//       urlCode: req.body.urlCode,
//       shortUrl: req.body.shortUrl,
//       data: req.body.data,
//       date: new Date(),
//       expiration: req.body.expiration,
//     },
//   };
//   db_connect
//     .collection("urls")
//     .updateOne(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       response.json(res);
//     });
// });

// Route for decryption
// urlRoutes.route("/decrypt/:code").post(function (req, res) {
//   let myquery = { urlCode: req.params.code };
  
// });}

// This section will check for expiration and delete the url if expired.
urlRoutes.route("/delete/:code").delete((req, response) => {
  let myquery = { urlCode: req.params.code };
  Url.deleteOne(myquery, function (err, res) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(res);
  });
});

module.exports = urlRoutes;