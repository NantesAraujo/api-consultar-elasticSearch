const elasticsearch = require('elasticsearch')

const auth = { userName: 'elastic', password: 'senha123' }

const servico = {
    elasticProducao = 'd0488-prd-elastic-edoc:9200',
    elasticHomologacao = 'd0488-hom-elastic-edoc:9200',
    elasticDesenvolvimento = '127.0.0.1:9200'
}

// let regionApi = 'dev'//process.env.NODE_ENV || null;

// if (regionApi === 'prd')
//     regionApi = elasticProducao
// else if (regionApi === 'hom')
//     regionApi = elasticHomologacao
// else if (regionApi === 'dev')
    // regionApi = elasticDesenvolvimento

// const client = new elasticsearch.Client({
//     host: `https://${auth.userName}:${auth.password}@${regionApi}`,
//     log: 'trace'
// });


module.exports = { auth , servico }