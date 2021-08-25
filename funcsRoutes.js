const puppeteer = require('puppeteer');

const login = require('./funcs/crawler/login');
const database = require('./funcs/database');

module.exports = {
  /* POST Routes */
  login: async (req, res) => {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--disable-notifications']
    });

    const page = await browser.newPage();
    let userExist;

    if(req.body.type === 'facebook'){
      userExist = await login.facebook(page, req.body);
    }else if(req.body.type === 'google'){
      userExist = await login.google(page, req.body);
    }else{
      return res.send({ isConnect: false });
    }

    if (!userExist) return res.send({ isConnect: false });

    const userInfo = await database.getUserInfo(req.body.username);

    await login.tinder(page, browser, req.body);

    res.send({ isConnect: true, user: userInfo });
  },
  getUserInfo: async (req, res) => {
    res.send(await database.getUserById(req.params.userId));
  },

  /* Views */
  home: (req, res) => {
    res.sendFile(__dirname + '/public/html/home.html');
  },
  profile: (req, res) => {
    res.sendFile(__dirname  + '/public/html/profile.html');
  },

  /* Css/Js */
  css: (req, res) => {
    res.sendFile(__dirname + '/public/css/' + req.params.filename);
  },
  js: (req, res) => {
    res.sendFile(__dirname + '/public/js/' + req.params.filename);
  }
};
