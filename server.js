//import {getStockPrice} from "./scraping"
const express = require('express');
let app = express();
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


app.get('/express_backend/:symbol', (req, res) => {
  let symbol = req.params.symbol;
  getStockDitailes(symbol).then((x =>{
    res.send({ express: x.price, rate: x.rate});
  }))
});


app.get('/express_backend/canvas/:symbol', (req, res) => {
  let symbol = req.params.symbol;
  getStockDitailes(symbol).then((x =>{
    res.send({ canvas: x });
  }))
});


app.get('/express_backend/currency/:currency', (req, res) => {
  getCurrency().then((x =>{
    res.send(x);
  }))
});


const getStockDitailes = async (symbol) => {
  const rp = require("request-promise");
  const cheerio = require("cheerio");
  //console.log(symbol);
  const url = "https://finance.yahoo.com/quote/" + symbol;
  try {
    const htmlString = await rp(url);
    const $ = cheerio.load(htmlString);
    let price = $('span[data-reactid="32"]').html();
    let rate = $('div[data-reactid="30"]').contents().first().text();
    var regExp = /\(([^)]+)\)/;
    return {price: price, rate: regExp.exec(rate)[1]};
  }
  catch (err) {
    return err;
  }
};

const getStockGraph = async (symbol) => {
  const rp = require("request-promise");
  const cheerio = require("cheerio");
  //console.log(symbol);
  const url = "https://finance.yahoo.com/quote/" + "NVDA";
  try {
    const htmlString = await rp(url);
    const $ = cheerio.load(htmlString);
    let canvas = $('div[id=NVDA-interactive-2col-qsp-m]').contents().first()
    return canvas;
  }
  catch (err) {
    return err;
  }
};

const getCurrency = async () => {
  const rp = require("request-promise");
  const cheerio = require("cheerio");
  try {
    const htmlString = await rp("https://finance.yahoo.com/quote/usdils=x/");
    const $ = cheerio.load(htmlString);
    let usd = $('span[data-reactid="32"]').html();
    const htmlString2 = await rp("https://finance.yahoo.com/quote/eurils=x/");
    const $2 = cheerio.load(htmlString2);
    let eur = $2('span[data-reactid="32"]').html();
    const htmlString3 = await rp("https://finance.yahoo.com/quote/gbpils=x/");
    const $3 = cheerio.load(htmlString3);
    let gbp = $3('span[data-reactid="32"]').html();
    return({usd: usd, eur: eur, gbp: gbp});
  }
  catch (err) {
    return err;
  }
};