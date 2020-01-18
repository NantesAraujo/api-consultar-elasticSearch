module.exports = (message, metadata) => {
    const error = new Error(message);
    error.metadata = metadata;
    return error;
}