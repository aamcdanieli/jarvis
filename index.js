const express = require('express')
const bodyParser = require('body-parse')
const alexaVerifier = require('alexa-verifier')
const fs = require('fs'),
const https = require('https')
const app = express()

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(443)

function requestVerifier(req, res, next) {
    alexaVerifier(
        req.headers.signaturecertchainurl,
        req.headers.signature,
        req.rawBody,
        function verificationCallback(err) {
            if (err) {
                res.status(401).json({ message: 'Verification Failure', error: err })
            } else {
                next()
            }
        }
    )
}

app.post('/recipeIntent', requestVerifier, function(req, res) {
    // We'll fill this out later!
    res.json({ hello: 'world' });
});

app.get('/', (req, res) => {
  res.send('HEY!')
})


app.listen(3000, () => console.log('Server running on port 3000'))