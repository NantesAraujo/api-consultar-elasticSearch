const dateUtils = require('../utils/DateUtil');

montarConsultar = (queryParams) => {
    let queryBuild = createQueryBasica();

    /* Inserir filtro Data Inicial e Data Final*/
    if(params.dataInicial && params.dataFinal)
        queryBuild += filtroPorData(queryParams);

    queryBuild += closeQueryBasica();

    return queryBuild;
    
}

createQueryBasica = () => {
    return `
        {
            "query": {
                "bool": {
    `;
}

closeQueryBasica = () => { 
    return `
            }
        }
    }`;
}

createClauseOr = (atributo, values) => {
    let itensClausulas = "";

    let string = `
        {
            "bool": {   
                "should": [
    `;

    values.forEach(function (item, indice, array) {
       itensClausulas += `{ 'match': { ' + ${atributo} + ': '${item[indice]}' }},`
    });

    string += itensClausulas.substring(0, itensClausulas.length - 1);

    string += `
                ]
            }
        }
    `;

}

filtroPorData = (params) => {
    let periodo = dateUtils.definirFiltroEntreDatas(params);

    let dataInicial = periodo.firstDay;
    let dataFinal = periodo.lastDay;

    return `
        "filter": [{
            "range": { 
                "dataTramite": { 
                    "gte": "${dataInicial}",
                    "lte": "${dataFinal}"
                }
            }
        }]
    `;
}

module.exports = { montarConsultar }