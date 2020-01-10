const elasticBuilder = require('../queryBuilder/elasticBuilder')
const elasticService = require('../services/elasticService')

servicoElasticSearchAtivo = async () => await elasticService.ping();


async function search(indice, filtros) {
    let query = elasticBuilder.montarConsultar(filtros);
    let result = await elasticService.execQuery(query)

    return result;
}

module.exports = { search }