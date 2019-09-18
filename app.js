var express = require("express");
const mongo = require("mongodb").MongoClient;
var app = express();
const url = "mongodb://localhost:27017";

app.listen(3000, () => {
  console.log("server running on port 3000");
});

app.get("/url", (req, res, next) => {
  var client = mongo.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err, client) => {
      var db = client.db("test");
      const collection = db.collection("customer");
      collection.find().toArray((err, items) => {
        res.json(items);
      });
      client.close();
      if (err) {
        console.error(err);
        return;
      }
    }
  );
});
