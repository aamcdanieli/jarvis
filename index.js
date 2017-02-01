const express = require('express')
const bodyParser = require('body-parse')
const alexaVerifier = require('alexa-verifier')
const fs = require('fs')
const https = require('https')
const app = express()

app.get('/', (req, res) => {
  res.send('HEY!')
})

app.listen(3000, () => console.log('Server running on port 3000'))