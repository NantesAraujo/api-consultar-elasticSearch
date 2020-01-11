const elasticsearch = require('elasticsearch')
const elasticConfig = require('../config/elasticConfig')
const node_env = 'dev' //process.env.node_env

initRegion = () => {
    let regionApi = undefined

    if (node_env === 'prd')
        regionApi = elasticConfig.urlElasticProducao
    else if (node_env === 'hom')
        regionApi = elasticConfig.urlElasticHomologacao
    else if (node_env === 'dev')
        regionApi = elasticConfig.urlElasticDesenvolvimento

    console.log(`http://${elasticConfig.userName}:${elasticConfig.password}@${regionApi}`)
    
    return `http://${elasticConfig.userName}:${elasticConfig.password}@${regionApi}`;
}

const client = new elasticsearch.Client({ host: initRegion() });

tratarError = (erro) => {
    let message = erro.message;

    if (erro.status)
        return { status: erro.status, message: erro.message, data: erro.body }
    else if (erro.message === "No Living connections")
        return { status: 444, message: erro.message, data: erro.body }

    return { status, message, data }
}

module.exports = {
    async execQuery(query) {
        try {
            const response = await client.search({ index: elasticConfig.indice, body: query })
            return { status: 200, message: undefined, data: response.hits };
        } catch (err) {
            return tratarError(err);
        }
    }
}