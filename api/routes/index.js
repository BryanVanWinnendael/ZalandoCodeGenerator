var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')
var axios = require("axios").default;
const https = require('https');
const API_URL = 'https://api.temp-mail.ru';
const test = require('tape');
/* GET home page. */
router.get('/', function (req, res, next) {
  e()
  res.render('index', { title: 'Express' });
});


function e() {


  generateEmail()
    .then((email) => {
      console.log(email)
      return email;
    })


}


function get(url) {
  console.log("this " + url)
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode < 200 || res.statusCode > 299) {
          reject(new Error(`Request failed: ${res.statusCode}`));
        }

        let data = '';

        res
          .on('data', (chunk) => { data += chunk; })
          .on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

/**
 * Generates MD5 hash from email
 * @param {string} email
 * @returns {string}
 */
// function getEmailHash(email) {
//   return crypto.createHash('md5').update(email).digest('hex');
// }

/**
 * Generates random email in given domains
 * @param {Array} domains
 * @param {number} [len=7]
 * @param {string} prefix
 * @returns {string}
 */
function getRandomEmail(domains, len = 7, prefix = '') {
  const alfabet = '1234567890abcdefghijklmnopqrstuvwxyz';

  let name = !prefix ? '' : `${prefix}-`;

  for (let i = 0; i < len; i++) {
    const randomChar = Math.round(Math.random() * (alfabet.length - 1));
    name += alfabet.charAt(randomChar);
  }

  const domain = domains[Math.floor(Math.random() * domains.length)];

  return name + domain;
}

/**
 * Receives available domains
 * @returns {Promise.<Array, Error>}
 */
function getAvailableDomains() {
  return get(`${API_URL}/request/domains/format/json/`).then(JSON.parse);
}

/**
 * Generates email on temp-mail.ru
 * @param {number} [len]
 * @param {string} prefix
 * @returns {Promise.<String, Error>}
 */
function generateEmail(len, prefix) {
  return getAvailableDomains()
    .then(availableDomains => getRandomEmail(availableDomains, len, prefix));
}

/**
 * Receives inbox from temp-mail.ru
 * @param {string} email
 * @returns {Promise.<(Object|Array), Error>}
 */
function getInbox(email) {
  if (!email) {
    throw new Error('Please specify email');
  }

  return get(`${API_URL}/request/mail/id/${getEmailHash(email)}/format/json/`).then(JSON.parse);
}

function deleteMail(mailId) {
  return new Promise((resolve, reject) => {
    if (!mailId) {
      return reject('Please specify mail identifier');
    }

    return get(`${API_URL}/request/delete/id/${mailId}/format/json/`).then(JSON.parse);
  });
}


module.exports = router;
