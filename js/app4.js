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

// Función que prueba el algoritmo con un grafo de ejemplo
function testFloydWarshall() {
    const grafo = [
        [0, 3, Infinity, 7],
        [8, 0, 2, Infinity],
        [5, Infinity, 0, 1],
        [2, Infinity, Infinity, 0]
    ];

    const resultado = floydWarshall(grafo);
    document.getElementById('resultado-floyd-warshall').innerText = 
        `Matriz de distancias: ${JSON.stringify(resultado)}`;
}
