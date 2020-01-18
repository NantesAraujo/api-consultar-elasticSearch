const ZoneBrazilWest = "Brazil/West";
const JANEIRO = 1;
const DEZEMBRO = 12;

definirData = (ano, mes, ultimoDia) => {
    if(ultimoDia)
        return new Date(ano, mes, 0); //retorna inicio do mes
    else 
        return new Date(ano, mes - 1, 01); //retorna ultimo dia do mes
}

definirFiltroEntreDatas = (filtros) => {  
    let dataInicio = filtros.dataInicio;
    let dataFim = filtros.dataFim;

    let firstDay = undefined;
    let lastDay = undefined;
    
    if(dataInicio && dataFim) {
        firstDay = dataInicio.toLocaleString("pt-BR", {timeZone: ZoneBrazilWest});
        lastDay = dataFim.toLocaleString("pt-BR", {timeZone: ZoneBrazilWest});
    } else {
        firstDay = definirData(parseInt(filtros.ano), JANEIRO, false);
        lastDay = definirData(parseInt(filtros.ano), DEZEMBRO, true);
    }

    return formatarDataElastic(new Date(firstDay), new Date(lastDay));
}

formatarDataElastic = (dataInicial, dataFinal) => {
    return {
        firstDay: `${dataInicial.getFullYear()}-${preencherComZero(dataInicial.getMonth()+1)}-${preencherComZero(dataInicial.getDate())}T00:00:00-04:00`,
        lastDay: `${dataFinal.getFullYear()}-${preencherComZero(dataFinal.getMonth()+1)}-${preencherComZero(dataFinal.getDate())}T23:59:59-04:00`
    }
}

preencherComZero = (number) => {
    return number >= 10 ? number : '0'+number;
}

module.exports = { definirFiltroEntreDatas, preencherComZero }
