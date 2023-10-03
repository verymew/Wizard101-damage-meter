function isNull(field, msg){
    if(field == null || !(field) || field == undefined){
        return { mensagem: msg }
    }
}

module.exports = isNull;