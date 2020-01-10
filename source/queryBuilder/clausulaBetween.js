module.exports = (atributo, dataInicial, dataFinal) => {
    return `
        "filter": [{
            "range": {
                "${atributo}": {
                    "gte": "${dataInicial}",
                    "lte": "${dataFinal}"
                }
            }
        }]
    `
}