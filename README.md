# api-consultar-elasticSearch

{
    "query": {
        "bool": {
            "must":[
                {
                    "bool": {   
                        "should": [
                            { "match": { "tipoDocumento": "OI" }},
                            { "match": { "tipoDocumento": "OC" }}
                        ]
                    }
                },
                {
                    "match":{
                        "estruturaIdDepartamento": 5015
                    }
                },
                {
                    "match": {
                        "numeroDocumento.numero": 2520
                    }
                },              
                {
                    "match": {
                        "assunto": "autorizacao"
                    }
                },              
                {
                    "match": {
                        "corpoTexto": "anuencia"
                    }
                },
                {
                    "match": {
                        "siglaDepartamento": "dop"
                    }
                },
                {
                    "match": {
                        "descricaoDepartamento": "operações"
                    }
                },              
                {
                    "match": {
                        "municipio": "mpo grande"
                    }
                },
                {
                    "bool": {   
                        "should": [
                            { "match": { "destinatarioDocumento.siglaDepartamento": "Vara" }},
                            { "match": { "destinatarioDocumento.nomeDestinatarioExterno": "Vara" }}
                        ]
                    }
                },
                {
                    "bool": {   
                        "should": [
                            { "match": { "destinatarioDocumento.descricaoDepartamento": "excelentissimo" }},
                            { "match": { "destinatarioDocumento.fechoDestinatarioExterno": "excelentissimo" }}
                        ]
                    }
                },              
                {
                    "match": {
                        "destinatarioDocumento.municipio": "NULO"
                    }
                },              
                {
                    "match": {
                        "ano": 2019
                    }
                },
                {
                    "match": {
                        "situacaoDocumento": "nao"
                    }
                }
            ],
            "filter": [{
                "range": { 
                    "dataEnvio": { 
                        "gte": "2019-01-10T00:00:00.000-03:00",
                        "lte": "2019-12-20T23:59:59.999-03:00"
                    }
                }
            }]
        }
    }
}