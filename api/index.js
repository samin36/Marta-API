const express = require("express");
const request = require("request");
const app = express();
const url = `http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey=${process.env.API_KEY}`;

const fetchData = () => {
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
};

app.get("*", (req, res) => {
  fetchData()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(process.env.PORT, () => console.log("LISTENING"));
