module.exports = (atributo, value) => {
    return `{ "match": { "${atributo}": "${value}" }},`;
}