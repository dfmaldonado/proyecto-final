function buscarLineal() {
  // Obtiene la cadena de números ingresada por el usuario, separada por comas,
  // y la convierte a un arreglo de números.
  const array = document.getElementById('array-input').value.split(',').map(Number);

  // Convierte el número objetivo ingresado por el usuario a un número.
  const target = Number(document.getElementById('target-input').value);

  // Busca el índice del objetivo en el arreglo. 
  // Devuelve -1 si no encuentra el número.
  const index = array.indexOf(target);

  // Muestra el resultado en el elemento HTML con el ID "resultado".
  // Si el índice es distinto de -1, muestra la posición del número en el arreglo.
  // Si no, indica que el número no fue encontrado.
  document.getElementById('resultado').innerText = 
      index !== -1 ? `Número encontrado en la posición ${index}` : 'Número no encontrado';
}