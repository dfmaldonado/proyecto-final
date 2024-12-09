// busqueda-lineal.js

function buscarLineal() {
    const array = document.getElementById('array-input').value.split(',').map(Number);
    const target = Number(document.getElementById('target-input').value);
    const index = array.indexOf(target);
    document.getElementById('resultado').innerText = 
        index !== -1 ? `Número encontrado en la posición ${index}` : 'Número no encontrado';
}

import ColaPrioridad from '../../../estructuras-datos/cola-prioridad/ColaPrioridad';

/**
 * @typedef {Object} CaminosMasCortos
 * @property {Object} distancias - distancias más cortas a todos los vértices.
 * @property {Object} verticesPrevios - caminos más cortos a todos los vértices.
 */

/**
 * Implementación del algoritmo de Dijkstra para encontrar los caminos más cortos en un grafo.
 * @param {Grafo} grafo - Grafo que vamos a recorrer.
 * @param {VerticeGrafo} verticeInicial - Vértice de inicio del recorrido.
 * @return {CaminosMasCortos}
 */
export default function dijkstra(grafo, verticeInicial) {
    
  // Inicializamos variables auxiliares para el algoritmo.
  const distancias = {};
  const verticesVisitados = {};
  const verticesPrevios = {};
  const cola = new ColaPrioridad();

  // Inicializamos todas las distancias con infinito, excepto el vértice inicial.
  grafo.obtenerTodosLosVertices().forEach((vertice) => {
    distancias[vertice.obtenerClave()] = Infinity;
    verticesPrevios[vertice.obtenerClave()] = null;
  });

  // La distancia al vértice inicial es cero.
  distancias[verticeInicial.obtenerClave()] = 0;

  // Agregamos el vértice inicial a la cola de prioridad.
  cola.agregar(verticeInicial, distancias[verticeInicial.obtenerClave()]);

  // Recorremos mientras la cola no esté vacía.
  while (!cola.estaVacia()) {
    // Obtenemos el vértice más cercano.
    const verticeActual = cola.extraer();

    // Recorremos los vecinos no visitados del vértice actual.
    verticeActual.obtenerVecinos().forEach((vecino) => {
      // Evitamos visitar vértices ya procesados.
      if (!verticesVisitados[vecino.obtenerClave()]) {
        // Calculamos la nueva distancia al vecino desde el vértice actual.
        const arista = grafo.encontrarArista(verticeActual, vecino);
        const distanciaActualAlVecino = distancias[vecino.obtenerClave()];
        const nuevaDistancia = distancias[verticeActual.obtenerClave()] + arista.peso;

        // Si encontramos un camino más corto, lo actualizamos.
        if (nuevaDistancia < distanciaActualAlVecino) {
          distancias[vecino.obtenerClave()] = nuevaDistancia;

          // Cambiamos la prioridad en la cola si el vecino está en ella.
          if (cola.tieneValor(vecino)) {
            cola.cambiarPrioridad(vecino, distancias[vecino.obtenerClave()]);
          }

          // Actualizamos el vértice previo.
          verticesPrevios[vecino.obtenerClave()] = verticeActual;
        }

        // Agregamos el vecino a la cola si aún no está.
        if (!cola.tieneValor(vecino)) {
          cola.agregar(vecino, distancias[vecino.obtenerClave()]);
        }
      }
    });

    // Marcamos el vértice actual como visitado.
    verticesVisitados[verticeActual.obtenerClave()] = verticeActual;
  }

  // Devolvemos las distancias más cortas y los caminos previos.
  return {
    distancias,
    verticesPrevios,
  };
}
