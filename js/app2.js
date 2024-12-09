// busqueda-binaria.js

function realizarBusquedaBinaria() {
    const arreglo = document.getElementById('arreglo').value.split(',').map(Number);
    const objetivo = Number(document.getElementById('objetivo').value);
    
    // Algoritmo de Búsqueda Binaria
    let bajo = 0;
    let alto = arreglo.length - 1;
    let encontrado = false;
    let resultado = -1;

    while (bajo <= alto) {
        const medio = Math.floor((bajo + alto) / 2);
        if (arreglo[medio] === objetivo) {
            encontrado = true;
            resultado = medio;
            break;
        } else if (arreglo[medio] < objetivo) {
            bajo = medio + 1;
        } else {
            alto = medio - 1;
        }
    }

    // Mostrar el resultado
    document.getElementById('resultado-busqueda-binaria').innerText = 
        encontrado ? `Número encontrado en la posición ${resultado}` : 'Número no encontrado';
}
