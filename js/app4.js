// Función principal para ejecutar el algoritmo de Floyd-Warshall
function floydWarshall(grafo) {
    const n = grafo.length;
    const dist = JSON.parse(JSON.stringify(grafo)); // Copiar la matriz del grafo

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    return dist;
}

// Función para procesar la entrada del usuario y convertirla en una matriz
function procesarGrafo(input) {
    const filas = input.trim().split('\n');
    const grafo = [];

    filas.forEach(fila => {
        const filaNumeros = fila.split(' ').map(valor => {
            return valor === 'Infinity' ? Infinity : parseInt(valor, 10);
        });
        grafo.push(filaNumeros);
    });

    return grafo;
}

// Función que prueba el algoritmo con los datos del usuario
function probarFloydWarshallConDatos() {
    const input = document.getElementById('grafo-input').value;
    
    // Procesar la entrada del usuario
    const grafo = procesarGrafo(input);

    // Verificar que la matriz esté correctamente formada
    if (grafo.length === 0 || grafo.some(fila => fila.length !== grafo.length)) {
        alert("Por favor, ingresa una matriz cuadrada válida.");
        return;
    }

    // Ejecutar el algoritmo de Floyd-Warshall
    const resultado = floydWarshall(grafo);

    // Mostrar el resultado
    document.getElementById('resultado-floyd-warshall').innerText = 
        `Matriz de distancias: ${JSON.stringify(resultado)}`;
}
