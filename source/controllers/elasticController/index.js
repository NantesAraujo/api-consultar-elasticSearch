const contextPath = require('../../config/path')
const elasticSearchBO = require('../../bo/elasticSearchBO')
const httpStatus = require('../../utils/HttpStatus')

module.exports = (app) => {
    
    app.get(contextPath + '/createIndex', async (req, res) => {
        
        elasticSearchBO.indexCreate().then( (value) => {
                let statusCode = value && value.acknowledged ? 200 : 400;
                let message = value && value.index === 'edoc' ? 'Indice Created Sucess' : 'Failued Create Index';

                return res.status(statusCode).send(message)
            }, function (erro) {
                if(erro && erro.message === "No Living connections")
                    return res.status(httpStatus.NO_LIVING_CONNECTION).send(erro.message);
                else
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(erro)
            })
    })

    app.get(contextPath + '/deleteIndex', async (req, res) => {
        
        elasticSearchBO.deleteIndex().then( value => {
                return res.status(200).send(value)
            }, function (erro) {
                if(erro && erro.message === "No Living connections")
                    return res.status(httpStatus.OK).send(erro.message);
                else
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(erro)
            })
    })

    app.get(contextPath + '/search', async (req, res) => {
        let result = await elasticSearchBO.search(req.query).then((response) => {
            return res.status(httpStatus.OK).send(response);
        }, (erro) => {
            return res.status(httpStatus.BAD_REQUEST).send(erro.message);
        })
    })
}