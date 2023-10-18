const validarStatus = (status) => {
    const valoresValidos = ["FEITO", "A FAZER", "FAZENDO"];
    return valoresValidos.includes(status);
};

module.exports = validarStatus;
