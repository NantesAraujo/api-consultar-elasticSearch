const contextPath = require('../../config/path')

module.exports = (app) => {
    app.get(contextPath + '/validarServicoAtivo', (req, res) => {
        res.status(200).send('Serviço Ativo Ambiente DevOps.');
    })
}