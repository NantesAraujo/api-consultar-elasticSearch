const ZoneBrazilWest = "Brazil/West";
const JANEIRO = 1;
const DEZEMBRO = 12;

definirData = (ano, mes, ultimoDia) => {
    if(ultimoDia)
        return new Date(ano, mes, 0); //retorna inicio do mes
    else 
        return new Date(ano, mes - 1, 01); //retorna ultimo dia do mes
}

definirFiltroEntreDatas = (params) => {  
    let dataInicial = params.dataInicial;
    let dataFinal = params.dataFinal;

    let firstDay = undefined;
    let lastDay = undefined;
    
    let dataAtual = new Date().toLocaleString("pt-BR", {timeZone: "Brazil/West"});

    if(dataInicial && dataFinal) {
        firstDay = (new Date(dataInicial)).toLocaleString("pt-BR", {timeZone: ZoneBrazilWest});
        lastDay = (new Date(dataFinal)).toLocaleString("pt-BR", {timeZone: ZoneBrazilWest});
    } else {
        firstDay = definirData(parseInt(obterAnoDataAtual(dataAtual)), JANEIRO, false);
        lastDay = definirData(parseInt(obterAnoDataAtual(dataAtual)), DEZEMBRO, true);
    }

    return formatarDataElastic(firstDay, lastDay);
}

obterAnoDataAtual = (dataAtual) => {
    return new Date(dataAtual).getFullYear();
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

module.exports = { definirFiltroEntreDatas }
