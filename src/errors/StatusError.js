class StatusError extends Error{
    constructor(message, codigoStatus){
        super(message);
        this.codigoStatus = codigoStatus;
    }
}

module.exports = StatusError;