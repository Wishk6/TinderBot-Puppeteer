const express = require('express');

const funcRoutes = require('./funcsRoutes');

module.exports = {
  router: (() => {
    const routes = express.Router();

    routes.route('/api/login').post(funcRoutes.login)
    routes.route('/api/user/:userId').get(funcRoutes.getUserInfo)

    routes.route('/').get(funcRoutes.home);
    routes.route('/profile').get(funcRoutes.profile);

    /* Css/Js */
    routes.route('/css/:filename').get(funcRoutes.css);
    routes.route('/js/:filename').get(funcRoutes.js);

    return routes;
  })()
};
