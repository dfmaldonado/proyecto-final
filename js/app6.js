// Función para encontrar el conjunto representativo de un nodo
function find(parent, i) {
    if (parent[i] === i) {
        return i;
    }
    return find(parent, parent[i]);
}

// Función para unir dos subconjuntos
function union(parent, rank, x, y) {
    const xroot = find(parent, x);
    const yroot = find(parent, y);

    if (xroot !== yroot) {
        if (rank[xroot] < rank[yroot]) {
            parent[xroot] = yroot;
        } else if (rank[xroot] > rank[yroot]) {
            parent[yroot] = xroot;
        } else {
            parent[yroot] = xroot;
            rank[xroot]++;
        }
    }
}

// Función principal del algoritmo de Kruskal
function kruskal(grafo, n) {
    let resultado = [];
    let parent = [];
    let rank = [];

    for (let i = 0; i < n; i++) {
        parent[i] = i;
        rank[i] = 0;
    }

    // Convertimos las aristas del grafo en un array
    let edges = [];
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (grafo[i][j] !== Infinity) {
                edges.push([i, j, grafo[i][j]]);
            }
        }
    }

    // Ordenamos las aristas por peso
    edges.sort((a, b) => a[2] - b[2]);

    // Recorremos las aristas para construir el árbol de expansión mínima
    for (let i = 0; i < edges.length; i++) {
        const [u, v, weight] = edges[i];
        const x = find(parent, u);
        const y = find(parent, v);

        // Si los nodos no están en el mismo conjunto, los unimos
        if (x !== y) {
            resultado.push([u, v, weight]);
            union(parent, rank, x, y);
        }
    }

    return resultado;
}

// Función para procesar el grafo ingresado por el usuario
function procesarGrafo() {
    const nodos = document.getElementById("nodos").value.split(',').map(e => e.trim());
    const aristas = document.getElementById("aristas").value.split('],').map(e => e.trim()).map(e => e.replace(']', '')).map(e => e.split(',').map(e => e.trim()));

    const n = nodos.length;
    const grafo = Array(n).fill().map(() => Array(n).fill(Infinity));

    // Asignamos los valores de las aristas en la matriz
    aristas.forEach(arista => {
        const [nodo1, nodo2, peso] = arista;
        const i = nodos.indexOf(nodo1);
        const j = nodos.indexOf(nodo2);
        grafo[i][j] = parseInt(peso);
        grafo[j][i] = parseInt(peso);  // Grafo no dirigido
    });

    // Ejecutamos el algoritmo de Kruskal
    const resultado = kruskal(grafo, n);

    // Mostramos el resultado
    document.getElementById("resultado-kruskal").innerText = 
        `Árbol de Expansión Mínima: ${JSON.stringify(resultado)}`;
}
