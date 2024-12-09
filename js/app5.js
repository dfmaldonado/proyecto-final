// Función principal para ejecutar el algoritmo de Prim
function prim(grafo) {
    const n = grafo.length;
    const visitado = Array(n).fill(false);
    const padre = Array(n).fill(-1);
    const costo = Array(n).fill(Infinity);
    const resultado = [];

    costo[0] = 0; // Empezamos desde el nodo 0

    for (let i = 0; i < n; i++) {
        // Buscar el nodo con el costo mínimo
        let u = -1;
        for (let j = 0; j < n; j++) {
            if (!visitado[j] && (u === -1 || costo[j] < costo[u])) {
                u = j;
            }
        }

        // Marcar el nodo como visitado
        visitado[u] = true;

        // Añadir el arco al resultado
        if (padre[u] !== -1) {
            resultado.push([padre[u], u, grafo[padre[u]][u]]);
        }

        // Actualizar los costos de los nodos vecinos
        for (let v = 0; v < n; v++) {
            if (grafo[u][v] !== Infinity && !visitado[v] && grafo[u][v] < costo[v]) {
                costo[v] = grafo[u][v];
                padre[v] = u;
            }
        }
    }

    return resultado;
}

// Función que prueba el algoritmo con un grafo de ejemplo
function testPrim() {
    const grafo = [
        [0, 2, 0, 6, 0],
        [2, 0, 3, 8, 5],
        [0, 3, 0, 0, 7],
        [6, 8, 0, 0, 9],
        [0, 5, 7, 9, 0]
    ];

    const resultado = prim(grafo);
    document.getElementById('resultado-prim').innerText = 
        `Árbol de expansión mínima: ${JSON.stringify(resultado)}`;
}
