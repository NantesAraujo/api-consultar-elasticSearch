const express = require('express');
const consign = require('consign');

module.exports = function(){
    const app = express();

    consign()
        .include('source/routes/default')
        .then('source/routes/elasticSearch')
        .into(app);

    return app;
}