const elasticsearch = require('elasticsearch')

const NODE_ENV = process.env.NODE_ENV

const indice = "edoc"

const elasticConfig = {
    userName: 'elastic',
    password: 'senha123',
    urlElasticProducao: 'd0488-prd-elastic-edoc:9200',
    urlElasticHomologacao: 'd0488-hom-elastic-edoc:9200',
    urlElasticDesenvolvimento: '127.0.0.1:9200'
}

getUrlServicoElastic = () => {
    let regionApi = undefined

    if (NODE_ENV === 'prd')
        regionApi = elasticConfig.urlElasticProducao
    else if (NODE_ENV === 'hom')
        regionApi = elasticConfig.urlElasticHomologacao
    else if (NODE_ENV === 'dev')
        regionApi = elasticConfig.urlElasticDesenvolvimento

    return `http://${elasticConfig.userName}:${elasticConfig.password}@${regionApi}`;
}

const client = new elasticsearch.Client({ host: getUrlServicoElastic() });

module.exports = { client, indice }