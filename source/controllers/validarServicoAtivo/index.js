const contextPath = require('../../config/path')
const region = process.env.NODE_ENV;

module.exports = (app) => {
    app.get(contextPath + '/validarServicoAtivo', (req, res) => {
        res.status(200).send('Serviço Ativo. #Ambiente: ' + region);
    })
}