// Grafo KRUSKAL

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

// Algoritmo de Kruskal
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

// Función que prueba el algoritmo con un grafo de ejemplo
function testKruskal() {
    const grafo = [
        [0, 2, Infinity, 6, Infinity],
        [2, 0, 3, 8, 5],
        [Infinity, 3, 0, Infinity, 7],
        [6, 8, Infinity, 0, 9],
        [Infinity, 5, 7, 9, 0]
    ];

    const n = grafo.length;
    const resultado = kruskal(grafo, n);
    document.getElementById('resultado-kruskal').innerText = 
        `Árbol de expansión mínima: ${JSON.stringify(resultado)}`;
}
