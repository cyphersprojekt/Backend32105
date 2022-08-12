class Usuario {
    constructor(
        nombre, //string,
        apellido, //string,
        libros, //array,
        mascotas //array
    )
    {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    };

    addMascota(mascota) {
        this.mascotas.push(mascota);
    };

    addLibros(libro) {
        this.libros.push(libro);
    };

    countMascotas() {
        return this.mascotas.length;
    };

    getBooks() {
        return this.libros;
    };
}

const juancito = new Usuario('Juan', '', [], []);
console.log(juancito.getFullName());
console.log('\r\n----------------------------------------------------\r\n');
juancito.addMascota('Perro');
juancito.addMascota('Gato');
console.log(juancito.countMascotas());
console.log('\r\n----------------------------------------------------\r\n');
juancito.addLibros('El libro de Juan');
juancito.addLibros('El libro de Pedro');
console.log(juancito.getBooks());

