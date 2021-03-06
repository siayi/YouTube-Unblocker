const express = require('express');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const fs = require('fs');
var app = express();

app.use('/', express.static('static'));

app.get('/video', function (req, res) {

    console.log(req.query.q);

    if (req.query.q === 'null')
        return res.status(404).end();    
   
    try {
        res.writeHead(200, { 'Content-Type': 'video/mp4' });
        ytdl(req.query.q).pipe(res);
    }
    catch {
        res.status(404).end();
    }

});

app.get('/download', function (req, res) {

    console.log(req.query.q);

    if (req.query.q === 'null')
        return res.status(404).end();
    try {

        (async () => {

            let info = await ytdl.getBasicInfo(req.query.q);

            let name = info.videoDetails.title.replace(/[\W_]+/g, " ");

            let stream = ytdl(req.query.q).pipe(fs.createWriteStream(name + ".mp4"));

            stream.on('finish', async () => {
                await res.sendFile(__dirname + "/" + name + ".mp4");

                fs.exists(name + ".mp4", (exists) => {
                    if (exists)
                        fs.unlink(name + ".mp4", () => { });
                });
            });

        })();
        
    }
    catch {
        res.status(404).end();
    }

});

app.get('/search', function (req, res) {
    ytsr(req.query.q, { limit: 20 })
        .then(r => res.send(r)) // Send the search results to client.
        .catch(e => res.status(437).end()); // If any errors send custom error code to client to handle itself.
});


app.listen(process.env.PORT || 3000);
