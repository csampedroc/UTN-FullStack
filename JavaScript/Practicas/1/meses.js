var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto","Septiembre", "Octubre", "Noviembre", "Diciembre"];

var diasDelMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Mostrar los meses de 30 días

console.log('Los meses con 30 días son:')
console.log('_________________________')

for (let i = 0; i < diasDelMes.length; i++) {

    if (diasDelMes[i] == 30) {
        console.log(meses[i]);
    }    
}

// Mostrar los meses de 31 días

console.log('Los meses con 31 días son:')
console.log('_________________________')

for (let i = 0; i < diasDelMes.length; i++) {

    if (diasDelMes[i] == 31) {
        console.log(meses[i]);
    }    
}