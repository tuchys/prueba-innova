// script.js

// Función para cargar datos desde la API
function cargarDatos(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const characterTableBody = document.getElementById('characterTableBody');
        characterTableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
  
        data.results.forEach(character => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${character.id}</td>
            <td><a href="#" onclick="mostrarDetalles('${character.url}')">${character.name}</a></td>
            <td>${character.species}</td>
            <td>${character.status}</td>
            <td><img src="${character.image}" alt="${character.name}" style="max-width: 50px;"></td>
          `;
          characterTableBody.appendChild(row);
        });
  
        // Actualizar la variable nextPageUrl para manejar la paginación
        nextPageUrl = data.info.next;
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  // Función para mostrar detalles en una nueva página
  function mostrarDetalles(url) {
    // Abrir una nueva ventana o pestaña con la URL proporcionada
    window.open(`personaje.html?url=${url}`, '_blank');
  }
  // Cargar datos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos('https://rickandmortyapi.com/api/character');
  });
  // Cargar datos al hacer clic en el botón "Cargar Datos"
  document.getElementById('loadDataButton').addEventListener('click', function() {
    cargarDatos('https://rickandmortyapi.com/api/character');
  });
  
  // Manejar paginación al hacer clic en el botón "Siguiente Página"
  document.getElementById('nextPageButton').addEventListener('click', function() {
    // Verificar si hay una página siguiente
    if (nextPageUrl) {
      cargarDatos(nextPageUrl);
    } else {
      console.log('No hay más páginas disponibles.');
    }
  });
  
  // Inicializar la variable nextPageUrl
  let nextPageUrl;
  