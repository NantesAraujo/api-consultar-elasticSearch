const elasticModel = require('../model/elasticModel')
const paginationUtils = require('../utils/paginationUtils')
const SimpleDto = require('../utils/SimpleDto')
const httpStatus = require('../utils/HttpStatus')
const CustomException = require('../exception/CustomException')

indexCreate = async () => {
    try {
        const isElasticReady = await elasticModel.checkConnection();

        if (isElasticReady) {
            const elasticIndex = await elasticModel.existsIndice();

            if (!elasticIndex)
                return await elasticModel.createIndex();
        }
    } catch (e) {
        return CustomException('Ocorreu um erro ao criar o indice no serviço elasticSearch!', e);
    }
}

deleteIndex = async () => {
    try {
        return await elasticModel.deleteIndex();
    } catch (e) {
        return CustomException('Ocorreu um erro ao deletar indice no serviço elasticSearch!', e);
    }
}

search = async (filtros) => {
    try {
        let result = await elasticModel.search(filtros)

        if (result && result.status == httpStatus.BAD_REQUEST || result.status == httpStatus.SERVICE_UNAVAILABLE) {
            return { status: result.status, message: result.message }
        } else {
            let { dados, qtdade } = paginationUtils(parseInt(filtros.offset), result.data.hits)

            response = {
                data: dados,
                total_reg: qtdade,
                total_page: null,
                has_prev: false,
                has_next: false
            }

            return SimpleDto.processarRetorno(response, httpStatus.OK, "", null);
        }
    } catch (e) {
        return CustomException('Ocorreu um erro ao consultar no serviço elasticSearch!', e);
    }
}

module.exports = { search, indexCreate, deleteIndex }