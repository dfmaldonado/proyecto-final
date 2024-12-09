function realizarBusquedaBinaria() {
    // Convierte la entrada del usuario (cadena) en un arreglo de números separados por comas
    const arreglo = document.getElementById('arreglo').value.split(',').map(Number);
    // Convierte la entrada del objetivo en un número.
    const objetivo = Number(document.getElementById('objetivo').value);
    
    // Inicializa los límites inferior (bajo) y superior (alto) del rango de búsqueda
    let bajo = 0;                     
    let alto = arreglo.length - 1;    
    let encontrado = false;           // Bandera para indicar si se encontró el objetivo
    let resultado = -1;               // Variable para almacenar el índice si se encuentra el objetivo

    // Inicia la búsqueda binaria
    while (bajo <= alto) {            
        // Calcula el índice del punto medio del rango actual
        const medio = Math.floor((bajo + alto) / 2);

        // Si el elemento medio es igual al objetivo, termina la búsqueda
        if (arreglo[medio] === objetivo) {
            encontrado = true;        // Marca que se encontró el objetivo
            resultado = medio;        // Guarda la posición del objetivo
            break;                    // Sale del bucle
        } 
        // Si el elemento medio es menor que el objetivo, busca en la mitad derecha
        else if (arreglo[medio] < objetivo) {
            bajo = medio + 1;         // Ajusta el límite inferior
        } 
        // Si el elemento medio es mayor que el objetivo, busca en la mitad izquierda
        else {
            alto = medio - 1;         // Ajusta el límite superior
        }
    }

    // Muestra el resultado en un elemento HTML
    document.getElementById('resultado-busqueda-binaria').innerText = 
        encontrado ? `Número encontrado en la posición ${resultado}` : 'Número no encontrado';
}
