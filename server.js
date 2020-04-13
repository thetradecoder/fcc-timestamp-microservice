// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  const dateVal = req.params.date_string;
  let date;
  let unix;
  let utc;

  if (Number(dateVal)) {
    unix = Number(dateVal);
    date = new Date(unix);
    utc = date.toUTCString();

    if (utc === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    }
  } else {
    if (dateVal === undefined) {
      unix = new Date().getTime();
    } else {
      unix = new Date(dateVal).getTime();
    }
    utc = new Date(unix).toUTCString();

    if (!Number(unix)) {
      // utc = "Invalid Date";
      // unix = null;
      res.json({ error: "Invalid Date" });
    }
  }
  res.json({ unix: unix, utc: utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
