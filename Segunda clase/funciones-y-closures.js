function mostrarListado(listado) {
    if (listado.length > 0) {
        listado.forEach(element => {
            console.log(element);
        });
    }
    else {
        console.log('No hay elementos en la lista');
    }
}
mostrarListado(['Juan', 'Pedro', 'Maria']);
mostrarListado([]);

console.log('----------------------------------------------------');

function crearMultiplicador(factor) {
    return function (numero) {
        return numero * factor;
    }
}
const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);
console.log(duplicar(10));
console.log(triplicar(10));

console.log('----------------------------------------------------');