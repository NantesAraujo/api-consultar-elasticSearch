const elasticsearch = require('elasticsearch')

const client = new elasticsearch.Client({
    host: 'http://localhost:9200',
    log: 'trace'
});

const query = `{"query": { "bool": {"must": [], "filter": [{ "range": {"dataTramite": {"gte": "2020-01-01T00:00:00-04:00","lte": "2020-12-31T23:59:59-04:00"
        }}}]}}}`;

async function makeQuery() {
    try {
        const response = await client.search({ index: 'edoc', body: query })
        return response.hits;
    } catch (err) {
        console.error(err)
    }
}

// buscar = async () => {
//     return client.search({ index: 'edoc', body: query });
//     // return new Promise((resolve, reject) => {
//     //     client.search({ index: 'edoc', body: query })
//     //         .then(function ({ body }) {
//     //             resolve(body);
//     //         }).catch((err) => {
//     //             reject(err);
//     //         });
//     // });
// }

// const result = buscar();


makeQuery()