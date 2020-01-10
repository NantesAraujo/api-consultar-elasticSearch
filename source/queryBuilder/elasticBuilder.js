const dateUtils = require('../utils/DateUtil');
const clausulaMatch = require('./clausulaMatch');
const clausulaOR = require('./clausulaOR');
const clausulaBetween = require('./clausulaBetween');

function filtroProValores(atributo, valores) {
    let query = "";

    let array = Array.isArray(valores) ? valores : [valores];
        
    array.filter((item, i, array) =>{
        query += clausulaMatch(atributo, item);
    })

    return query.substr(0, query.length - 1);
}

function filtroPorAtributos(atributos, valor) {
    let query = "";

    atributos.filter((item, i, array) => {
        query += clausulaMatch(item, valor);
    });

    return query.substr(0, query.length - 1);
}

inicializarBaseConsultar = () => {  return '{"query": { ' }


inserirCondicaoBool = () => { return '"bool": {' }

inserirCondicaoMust = () => { return '"must": [' }

finalizarBaseConsultar = () => { return '}}'; }

fecharCondicaoBool = () => { return '}' }

fecharCondicaoMust = () => { return ']' }

isPossuiFiltroQuery = (query) => {
    return query.includes("match");
}

montarConsultar = (filtros) => {
    let queryBuild = inicializarBaseConsultar();
    queryBuild += inserirCondicaoBool();
    queryBuild += inserirCondicaoMust();

    if(filtros.tipoDocumento){
        let querysMatch = filtroProValores("tipoDocumento", filtros.tipoDocumento)
        queryBuild += clausulaOR(querysMatch);
    }

    if(filtros.estruturaIdDepartamento)
        queryBuild += clausulaMatch("estruturaIdDepartamento", parseInt(filtros.estruturaIdDepartamento));

    if(filtros.numero)
        queryBuild += clausulaMatch("numeroDocumento.numero", parseInt(filtros.numero));

    if(filtros.assunto)
        queryBuild += clausulaMatch("assunto", filtros.assunto);

    if(filtros.corpoTexto)
        queryBuild += clausulaMatch("corpoTexto", filtros.corpoTexto);

    if (filtros.siglaDepartamento)
        queryBuild += clausulaMatch("siglaDepartamento", filtros.siglaDepartamento);

    if (filtros.descricaoDepartamento)
        queryBuild += clausulaMatch("descricaoDepartamento", filtros.descricaoDepartamento);

    if(filtros.municipio)
        queryBuild += clausulaMatch("municipio", filtros.municipio);

    if (filtros.siglaDepartamentoDestinatario) {
        let atributos = ['destinatarioDocumento.siglaDepartamento', 'destinatarioDocumento.nomeDestinatarioExterno'];
        let filtro = filtros.siglaDepartamentoDestinatario;
        // let separador = queryBuild.length > 0 ? "," : "";

        queryBuild += "" + clausulaOR(filtroPorAtributos(atributos, filtro));
    }

    if(isPossuiFiltroQuery(queryBuild))
        queryBuild = queryBuild.substring(0, queryBuild.length - 1)

    queryBuild += fecharCondicaoMust();

    if(filtros.ano){
        let periodo = dateUtils.definirFiltroEntreDatas(filtros);
        let separador = queryBuild.length > 0 ? "," : "";

        queryBuild += separador + clausulaBetween("dataTramite", periodo.firstDay, periodo.lastDay);
    }

    queryBuild += fecharCondicaoBool();
    queryBuild += finalizarBaseConsultar();
    
    return queryBuild;
}

module.exports = { montarConsultar }