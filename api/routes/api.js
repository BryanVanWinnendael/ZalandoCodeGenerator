
const puppeteer = require('puppeteer');

const fs = require('fs');
const cors = require('cors')
const tempmail = require('./MailApi')

var express = require('express');
var router = express.Router();

const randomUA = require('modern-random-ua');

router.use(cors({
    origin: "*"
}))


var databases;


router.get('/', async function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    generate(res)
    
    // wreadcode()
    // try {
    //     code2 = await generate();
    //     res.send(code2)
        
    // }
    // catch (error) {
    //     console.log("oops")
    // }
    // console.log("hier")
    // console.log(globalcode)
    // console.log(wreadcode())
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



async function SendCode(mail,res) {
    const browserZalando = await puppeteer.launch({
        userAgent: randomUA.generate(),
        useChrome: true,
        stealth: true,
        headless:true,
        args:["--no-sandbox"]
    });

    const pageNieuws = (await browserZalando.pages())[0];
    pageNieuws.viewport({
        width: 1024 + Math.floor(Math.random() * 100),
        height: 768 + Math.floor(Math.random() * 100),
    })
    pageNieuws.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36')
   

    
    await pageNieuws.goto('https://www.zalando.be/zalando-nieuwsbrief/')
  

    await pageNieuws.click("label[for='gender-1']");
    await pageNieuws.type('#email-input',mail.id)
    await pageNieuws.click("button[type='submit']");

    browserZalando.close();

    console.log("mail  send to " + mail.id)

    return getCode(mail,res)

}


function splits(str) {
    return str.split ("\n")
   
}


async function sendMail(mail,res){
    //send nieuwbrief
    return SendCode(mail,res)
}

// creates a temp mail
async function getMail(res){
    const client = tempmail.Create();
    
    client.on('ready', email => {
        // loggedMail = logged in email
        console.log(email)
        var loggedMail = tempmail.Login(email)
        return sendMail(loggedMail,res)
        
    })   


}



async function getCode(mail,res){
    var id
    const tmail = mail
  

    try{
        mail.startMessageListener(1000, msgs => {
            
            mail.fetch().then(messages => {
                id = messages[0]._id
                foundcode = true
                
            }).then(()=>{
                mail.findMessage(id).then(msg => {
                const code = splits(msg.body.text)[33]
             
                var codeSend = code.split(" ")
                setCode(codeSend[0])
                res.send(codeSend[0].jsonValue())                
            });
            })
         
            
        })
    }
    catch(e){
        console.log("here" + e)
    }
  
      
 
    setTimeout(mail.stopMessageListener, 10000);
  

   




    // setTimeout((() =>{

    //     // const loggedMail = tempmail.Login(tmail.id)
    //     console.log(tmail)
        
      

    // }),13000);
   

   
    
   

  

}



async function generate(res){
    getMail(res)   
}




module.exports = router;



