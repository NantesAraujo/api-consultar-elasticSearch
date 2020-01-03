const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200'})

const contextPath = require('../../config/path')

const elasticSearchBO = require('../../bo/elasticSearchBO')

module.exports = (app) => {
    
    app.get(contextPath + '/search', (req, res) => {
        res.status(200).send(elasticSearchBO.montarConsultar(req.params));
    })
}