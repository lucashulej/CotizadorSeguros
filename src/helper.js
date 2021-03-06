export function obtenerDiferenciaYear(year) {
    return new Date().getFullYear() - year;
}

export function calcularMarca(marca) {
    let incremento;

    switch(marca)
    {
        case 'europeo':
            incremento = 0.3;
            break;
        case 'americano':
            incremento = 0.15;
            break;
        case 'asiatico':
            incremento = 0.05;
            break;
        default:
            break;
    }
    return incremento;
}

export function calcularPlan(plan) {
    return (plan === 'basico') ? 0.2 : 0.5;
}

export function primerMayuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}