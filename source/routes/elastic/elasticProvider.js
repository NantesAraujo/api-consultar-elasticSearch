const contextPath = require('../../config/path')
const elasticSearchBO = require('../../bo/elasticSearchBO')

module.exports = (app) => {

    app.get(contextPath + '/customSearch', async (req, res) => {
        let result = await elasticSearchBO.search(req.query)

        if(result.status == 200) 
            return res.status(result.status).send(result.data);
        else 
            return res.status(result.status).send(result.message);
    })
}