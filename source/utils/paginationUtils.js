const DateUtil = require('../utils/DateUtil')

const range = 10;

formateDate = (data) => {
    let dia = DateUtil.preencherComZero(data.getDate())
    let mes = DateUtil.preencherComZero((data.getMonth() + 1))
    let ano = data.getFullYear()
    let hora = DateUtil.preencherComZero(data.getHours())
    let minute = DateUtil.preencherComZero(data.getMinutes())
    let segundos = DateUtil.preencherComZero(data.getSeconds())
    
    return `${dia}/${mes}/${ano} - ${hora}:${minute}:${segundos}`;
}

removerDuplicados = (data) => {
    let novoArray = []

    data.forEach(element => {
        let indice = novoArray.findIndex(val => val.id == element._source.id)

        element._source.dataTramite = formateDate(new Date(element._source.dataTramite));
        element._source.dataCriacao = formateDate(new Date(element._source.dataCriacao));

        if(element._source.destinatarioDocumento.dataLeitura !== "NULO")
            element._source.destinatarioDocumento.dataLeitura = formateDate(new Date(element._source.destinatarioDocumento.dataLeitura));

        if (indice < 0)
            novoArray.push(element._source)
    });

    return novoArray;
}

module.exports = (page, documentos) => {
    let data = removerDuplicados(documentos);

    let offset = page <= 1 ? 0 : ((page - 1) * range);
    let limit = page > 1 ? (page * range) : range;

    return { dados: data.slice(offset, limit), qtdade: data.length }
}