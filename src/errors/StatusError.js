class StatusError extends Error{
    constructor(mensagem, codigoStatus){
        super(mensagem);
        this.codigoStatus = codigoStatus;
    }
}