processarRetorno = (dados, statusCode, mensagem) => {
    return  {
        "status": {
            "code": statusCode,
            "mensagem": mensagem
        },
        "pagination": {
            "has_prev": dados ? dados.has_prev : null,
            "has_next": dados ? dados.has_next : null,
            "page_count": null,
            "page_number": null,
            "total_reg": dados ? dados.total_reg : null,
            "total_page": dados ? dados.total_page : null
        },
        "link_create": "",
        "version": "",
        "data": dados ? dados.data : null
    }
}
module.exports = { processarRetorno }
