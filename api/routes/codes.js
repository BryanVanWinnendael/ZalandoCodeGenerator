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



var firstcode;

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
  }

router.get('/', nocache, async function (req, res, next) {
    getFirstCode()
    console.log(firstcode)
    res.set('Access-Control-Allow-Origin', '*');
    deletecode(firstcode)
    res.send(firstcode)
} );


function deletecode(sendcode){
    const data = fs.readFileSync('./data.json', 'utf8');
    const codes = JSON.parse(data);
    for(i in codes){
        if(codes[i] === sendcode){
            codes[i] = "";
            break;
        } 
    }
    try {
        const data = JSON.stringify(codes, null, 4);
        fs.writeFileSync('./data.json', data, 'utf8');

    } catch (err) {
        console.log(`Error writing file: ${err}`);
    }

}

function getFirstCode(){
    const data = fs.readFileSync('./data.json', 'utf8');
    const codesJson = JSON.parse(data);

    for (var i = Object.keys(codesJson).length  ; i >= 0; i--) {
        if(codesJson[i] != ""){
            console.log(codesJson[i])
            firstcode = codesJson[i];
            break
        } 
        
    }
    return firstcode;

}









// ------------------





module.exports = router;



