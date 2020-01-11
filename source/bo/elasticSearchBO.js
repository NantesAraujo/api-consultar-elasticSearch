const elasticBuilder = require('../queryBuilder/elasticBuilder')
const elasticService = require('../services/elasticService')

async function search(filtros) {
    let query = elasticBuilder.montarConsultar(filtros);
    let result = await elasticService.execQuery(query)

    return result;
}

module.exports = { search }