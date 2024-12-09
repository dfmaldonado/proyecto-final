// busqueda-lineal.js

function buscarLineal() {
    const array = document.getElementById('array-input').value.split(',').map(Number);
    const target = Number(document.getElementById('target-input').value);
    const index = array.indexOf(target);
    document.getElementById('resultado').innerText = 
        index !== -1 ? `Número encontrado en la posición ${index}` : 'Número no encontrado';
}