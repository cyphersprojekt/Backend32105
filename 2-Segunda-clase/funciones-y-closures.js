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

console.log('\r\n----------------------------------------------------\r\n');

function crearMultiplicador(factor) {
    return function (numero) {
        return numero * factor;
    }
}
const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);
console.log(duplicar(10));
console.log(triplicar(10));

console.log('\r\n----------------------------------------------------\r\n');

class Persona {
    constructor(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    saludar() {
        console.log(`Hola, me llamo ${this.nombre} ${this.apellido} y tengo ${this.edad} años`);
    }
}
const juancito = new Persona('Juan', '', 30);
console.log(juancito);
juancito.saludar();

console.log('\r\n----------------------------------------------------\r\n');

