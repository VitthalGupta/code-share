const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
// const client = new MongoClient(Db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
var db = mongoose.connect(Db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log("Connected to MongoDB"));

 module.exports = mongoose;



// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (db)
//       {
//         _db = db.db("myFirstDatabase");
//         console.log("Successfully connected to MongoDB."); 
//       }
//       return callback(err);
//          });
//   },
 
//   getDb: function () {
//     return _db;
//   },
// };