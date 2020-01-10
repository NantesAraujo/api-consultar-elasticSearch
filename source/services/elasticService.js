// const conn = require('../config/connectionElasticSearch')
const elasticsearch = require('elasticsearch')

const client = new elasticsearch.Client({
    host: 'http://localhost:9200',
    log: 'trace'
});

montarRetorno = (status, message, data) => {
    return { status, message, data }
}

module.exports = {
    async execQuery(query) {
        try {
            const response = await client.search({ index: 'edoc', body: query })
            return montarRetorno(200, '', response.hits);
        } catch (err) {
            return err;
        }
    }
}