const express = require('express');
const consign = require('consign');

module.exports = () => {
    const app = express();

    consign()
        .include('source/controllers/validarServicoAtivo')
        .then('source/controllers/elasticController')
        .into(app);

    return app;
}