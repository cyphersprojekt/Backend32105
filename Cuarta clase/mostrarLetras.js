const start = () => console.log('start ' + new Date());
const end = () => console.log('end ' + new Date());

function mostrarLetrasForI(cb1, input, cb2, timer) {
    cb1();
    let i = 0;
    let interval = setInterval(() => {
        if (i < input.length) {
            console.log(input[i]);
            i++;
        } else {
            clearInterval(interval);
            cb2();
        }
    }, timer);
}
//mostrarLetrasForI(start, 'Hola', end, 0);
//mostrarLetrasForI(start, 'Hola', end, 250);
//mostrarLetrasForI(start, 'Hola', end, 500);

function mostrarLetrasForEach(cb1, input, cb2, timer) {
    //cb1();
    //input.Array.from
    Array.from(input).forEach((element => {
        setInterval(() => {
            console.log(element);
        }, timer);
    }
    ));
    //cb2();
    console.log('QUE LENGUAJE DE MIERDA');
}

mostrarLetrasForEach(start, 'Hola', end, 1000);