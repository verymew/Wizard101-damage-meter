function isCampoNulo(arrayDeCampos) {
    for (const campo of arrayDeCampos) {
        if (!campo) {
          return true;
        }
    }
    return false;
}

module.exports = isCampoNulo;