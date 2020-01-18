const esClient = require('../config/connectionElastic')
const elasticBuilder = require('../builders/elasticBuilder')
const httpStatus = require("../utils/HttpStatus")
const CustomException = require('../exception/CustomException')

existsIndice = async () => {
    let exist = await esClient.client.indices.exists({ index: esClient.indice })
    return exist;
}

createIndex = async () => {

    return new Promise((resolve, reject) => {
        esClient.client.indices.create({
            index: esClient.indice,
            body: {
                "settings": {
                    "analysis": {
                        "analyzer": {
                            "analyzer_customizado": {
                                "tokenizer": "standard",
                                "filter": [
                                    "lowercase",
                                    "stemmer_plural_portugues",
                                    "asciifolding"
                                ]
                            }
                        },
                        "filter": {
                            "stemmer_plural_portugues": {
                                "type": "stemmer",
                                "name": "minimal_portuguese"
                            }
                        }
                    }
                },
                "mappings": {
                    "properties": {
                        "id": {
                            "type": "long"
                        },
                        "idRepasse": {
                            "type": "long"
                        },
                        "idDocumentoAnterior": {
                            "type": "long"
                        },
                        "assunto": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "confidencial": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "dataCriacao": {
                            "type": "date"
                        },
                        "usuarioCriacao": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "nomeUsuario": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "estruturaIdDepartamento": {
                            "type": "long"
                        },
                        "estruturaIdOrgao": {
                            "type": "long"
                        },
                        "idDepartamentoEnvio": {
                            "type": "long"
                        },
                        "siglaDepartamento": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "siglaOrgao": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "ano": {
                            "type": "long"
                        },
                        "documentoFisico": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "tipoDocumento": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "assinadoDigital": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "possuiAnexo": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "tipoConsulta": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "movidoPasta": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "descricaoDepartamento": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "municipio": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "dataTramite": {
                            "type": "date"
                        },
                        "numeroDocumento": {
                            "properties": {
                                "ano": {
                                    "type": "long"
                                },
                                "dataAssinatura": {
                                    "type": "date"
                                },
                                "idDepartamentoSGE": {
                                    "type": "long"
                                },
                                "numero": {
                                    "type": "long"
                                }
                            }
                        },
                        "tramite": {
                            "properties": {
                                "situacaoTramite": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "status": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "usuarioEnvio": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                }
                            }
                        },
                        "destinatarioDocumento": {
                            "properties": {
                                "id": {
                                    "type": "long"
                                },
                                "siglaDepartamento": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "descricaoDepartamento": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "municipio": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "lidoPor": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "dataLeitura": {
                                    "type": "text"
                                },
                                "movidoPasta": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "situacao": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "estruturaIdDepartamento": {
                                    "type": "long"
                                },
                                "possuiObservacao": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "idDestinatarioExterno": {
                                    "type": "long"
                                },
                                "nomeDestinatarioExterno": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "fechoDestinatarioExterno": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "codigoUsuarioGsi": {
                                    "type": "long"
                                },
                                "TipoRecebimento": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                },
                                "respondido": {
                                    "type": "text",
                                    "analyzer": "analyzer_customizado",
                                    "fields": {
                                        "keyword": {
                                            "type": "keyword",
                                            "ignore_above": 256
                                        }
                                    }
                                }
                            }
                        },
                        "corpoTexto": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "situacaoDocumento": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "usuarioEnvio": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        },
                        "tipoRepasse": {
                            "type": "text",
                            "analyzer": "analyzer_customizado",
                            "fields": {
                                "keyword": {
                                    "type": "keyword",
                                    "ignore_above": 256
                                }
                            }
                        }
                    }
                }
            }
        }, function (erro, response) {
            if (erro)
                reject(erro)
            else
                resolve(response);
        });
    });
}

deleteIndex = async () => {
    return new Promise((resolve, reject) => {
        esClient.client.indices.delete({ index: esClient.indice },
            (response) => {
                resolve(response);
            }, (erro) => {
                reject(erro)
            });
    })
}

checkConnection = async () => {
    return new Promise((resolve, reject) => {
        esClient.client.cluster.health({}, (erro, response) => {
            if (erro)
                reject(erro)
            else
                resolve(response)
        });
    })
}

tratarError = (erro, query) => {
    let message = erro.message;

    if (erro.status)
        return { status: erro.status, message: erro.message, data: erro.body }
    else if (erro.message === "No Living connections")
        return { status: httpStatus.SERVICE_UNAVAILABLE, message: erro.message, data: erro.body, query }

    return { status, message, data, query }
}

search = async (filtros) => {
    let query = elasticBuilder.createQuery(filtros);

    try {
        let elasticCount = await esClient.client.count({ index: esClient.indice, body: query });
        
        let response = await esClient.client.search({ 
            index: esClient.indice, 
            sort: ["dataTramite:desc"], 
            size: elasticCount.count, 
            body: query 
        })

        return { status: httpStatus.OK, message: '', data: response.hits };
    } catch (err) {
        return CustomException(err.message, e)
    }
}

module.exports = { checkConnection, createIndex, existsIndice, search, deleteIndex };