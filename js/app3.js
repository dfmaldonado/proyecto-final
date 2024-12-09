const grafo = {}; // Estructura del grafo

// Agregar nodos y conexiones desde el formulario
document.getElementById('btnIngresar').addEventListener('click', () => {
    const nodo = document.getElementById('nodo').value.trim();
    const conexionesInput = document.getElementById('conexiones').value.trim();

    if (!nodo || !conexionesInput) {
        alert('Por favor, ingresa un nodo y sus conexiones.');
        return;
    }

    // Parsear las conexiones
    const conexiones = conexionesInput.split(',').reduce((acc, conexion) => {
        const [destino, distancia] = conexion.split(':');
        if (destino && distancia) {
            acc[destino.trim()] = parseFloat(distancia.trim());
        }
        return acc;
    }, {});

    // Agregar al grafo
    grafo[nodo] = conexiones;

    // Mostrar en consola para verificar
    console.log('Grafo actual:', grafo);

    // Limpiar los campos
    document.getElementById('nodo').value = '';
    document.getElementById('conexiones').value = '';
    alert(`Nodo "${nodo}" ingresado correctamente.`);
});

// Lógica del algoritmo de Dijkstra (sin cambios)
function dijkstra(grafo, origen) {
    const distancias = {};
    const previos = {};
    const visitados = new Set();
    const queue = [];

    // Inicializar distancias a infinito y previos a null
    for (let nodo in grafo) {
        distancias[nodo] = Infinity;
        previos[nodo] = null;
    }
    distancias[origen] = 0;

    // Agregar el nodo de inicio a la cola
    queue.push([origen, 0]);

    while (queue.length > 0) {
        // Ordenar la cola por distancia
        queue.sort((a, b) => a[1] - b[1]);
        const [nodo, distancia] = queue.shift();

        if (visitados.has(nodo)) continue;
        visitados.add(nodo);

        // Actualizar las distancias de los nodos vecinos
        for (let vecino in grafo[nodo]) {
            const nuevaDistancia = distancia + grafo[nodo][vecino];
            if (nuevaDistancia < distancias[vecino]) {
                distancias[vecino] = nuevaDistancia;
                previos[vecino] = nodo;
                queue.push([vecino, nuevaDistancia]);
            }
        }
    }

    return { distancias, previos };
}

// Probar el algoritmo con el grafo actual
function testDijkstra() {
    clearResultado(); // Limpia el resultado previo antes de mostrar uno nuevo

    if (Object.keys(grafo).length === 0) {
        alert('Primero ingresa un grafo.');
        return;
    }
    const nodoOrigen = prompt('Ingresa el nodo origen:');
    if (!nodoOrigen || !grafo[nodoOrigen]) {
        alert('El nodo origen no existe en el grafo.');
        return;
    }

    const resultado = dijkstra(grafo, nodoOrigen);
    document.getElementById('resultado').innerText = JSON.stringify(resultado, null, 2);
}

// Función para limpiar el resultado
function clearResultado() {
    document.getElementById('resultado').innerText = '';
}
