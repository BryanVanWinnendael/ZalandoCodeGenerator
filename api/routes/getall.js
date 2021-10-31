// cors
const database = require('../data.json');

const path = require('path');
const fs = require('fs');
const cors = require('cors')

var express = require('express');
var router = express.Router();
router.use(cors({
    origin: "*"
}))



function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
  }

router.get('/', nocache, async function (req, res, next) {
    const data = fs.readFileSync('./data.json', 'utf8');
    const codesJson = JSON.parse(data);
    res.send(codesJson)
} );





// ------------------





module.exports = router;



