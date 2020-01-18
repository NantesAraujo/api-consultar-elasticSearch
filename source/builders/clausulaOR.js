module.exports = (querysMatch) => {
    let query = `
    {
        "bool": {
            "should": [
                ${querysMatch}
            ]
        }
    },`  ;

    return query;
}