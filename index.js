// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function dateParser(dateString) {
  console.log(dateString);
  let date;
  if (dateString === '' || dateString === undefined) {
    date = new Date();
    return getDateObject(date);
  }
  epoch = parseInt(dateString);
  date = !isNaN(epoch) && String(epoch) === dateString ? new Date(epoch) : new Date(dateString);
  if (date.toString() !== "Invalid Date") {
    return getDateObject(date);
  } else {
    return { error: "Invalid Date" };
  }
}

function getDateObject(date) {
  return { unix: date.getTime(), utc: date.toUTCString() };
}

const dateHandler = (req, res) => {
  return res.json(dateParser(req.params.date));
}

app.get("/api/:date?", dateHandler);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
