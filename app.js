const express = require('express');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
var app = express();

app.use('/', express.static('static'));

app.get('/video', function(req, res){
  try {

    var ytRsp = ytdl(req.query.q).catch(e => console.log(e));

    ytRsp.pipe(res); // Download and pipe response to the client.
  }
  catch {
    res.status(404).end();
  }
});

app.get('/search', function(req, res) {
  ytsr(req.query.q, {limit: 20})
    .then(r => res.send(r)) // Send the search results to client.
    .catch(e => res.status(437).end()); // If any errors send custom error code to client to handle itself.
});


app.listen(process.env.PORT || 3000);
