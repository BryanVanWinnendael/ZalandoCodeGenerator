// cors
const database = require('../data.json');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const cors = require('cors')

var express = require('express');
var router = express.Router();
router.use(cors({
    origin: "*"
}))

var globalcode;
var databases;


router.get('/', async function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    wreadcode()
    try {
        code2 = await generate();
        res.send(code2)
        
    }
    catch (error) {
        console.log("oops")
    }
    console.log("hier")
    console.log(globalcode)
    console.log(wreadcode())
});


// ------------------
function wreadcode() {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
            databases = JSON.parse(data);
            
            return databases;
        }
    });
    return databases;
}

function setCode(setCode){
    const codes =  wreadcode();
    console.log(codes)
    console.log(setCode)
    for(i in codes){
        if(codes[i] === ""){
            codes[i] = setCode;
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




async function openMailBrowser() {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox"]
    });
    return browser;
}

async function scrapeMail(page) {
    const [el] = await page.$x('/html/body/div[3]/div/div/b/span');
    const text = await el.getProperty('textContent');
    const mail = await text.jsonValue();
    return mail;
}

async function SendCode(pagemail) {
    const browserZalando = await puppeteer.launch({
        args: ["--no-sandbox"]
    });
    const pageNieuws = await browserZalando.newPage();
    await pageNieuws.goto('https://www.zalando.be/zalando-nieuwsbrief/');
    await pageNieuws.waitFor(3000);
    const buttona = await pageNieuws.$x('//*[@id="uc-btn-accept-banner"]');
    await buttona[0].click();
    await pageNieuws.type('#email-input', mail);
    await pageNieuws.evaluate(() => {
        var test = document.querySelector('#gender-1');
        test.click();
    })
    const buttonsend = await pageNieuws.$x('/html/body/div[4]/div/div/div/div/div/div/div[2]/div/div/form/div/div/div[5]/button');
    await buttonsend[0].click();
    browserZalando.close();
}

async function returncode(page, pagemail) {
    const [el2] = await page.$x('/html/body/div[4]/div/div/div/div[2]/div[2]/div[4]/div[3]/table[2]/tbody/tr/td/table/tbody/tr/td/table[7]/tbody/tr/td/table[2]/tbody/tr/td/table[4]/tbody/tr/td[1]');
    const textcode = await el2.getProperty('textContent');
    var code2 = await textcode.jsonValue();
    pagemail.close();
    setCode(code2)
    globalcode = code2;
   
   

    return code2;

}

async function getCode(page, pagemail) {
    try {

        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        b = await page
            .waitForSelector('#email-table > div.e7m.row.list-group-item > div.e7m.col-md-12.ma1 > div.e7m.mess_bodiyy > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > table:nth-child(8) > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table:nth-child(4) > tbody > tr > td:nth-child(1)')
            .then(() => returncode(page, pagemail));
        return b;
    }
    catch (error) {
        console.log("error getcode")
    }
}


async function generate() {
    try {

        pagemail = await openMailBrowser();
        const page = await pagemail.newPage();
        await page.goto('https://generator.email/');
        console.log("getting mail...");

        mail = await scrapeMail(page);
        console.log("sending mail...");

        await SendCode(mail);
        console.log("getting code...");

        code = await getCode(page, pagemail);

        console.log("code: " + code);
        await wreadcode();
        pagemail.close()

        return code;


    }
    catch (error) {
        console.log("something went wrong....")
    }

}


module.exports = router;



