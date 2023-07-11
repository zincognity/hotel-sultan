const btnToggle = document.querySelector(".btn-menu");

btnToggle.addEventListener('click', function () {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
});

  
// Obtener el elemento del menú "Gestión de habitaciones"
var menuGestion = document.querySelector('.menu_3');

// Obtener el submenú de gestión de habitaciones
var submenuGestion = menuGestion.querySelector('.submenu-gestion');

// Agregar evento clic al menú "Gestión de habitaciones"
menuGestion.addEventListener('click', function(e) {
  // Alternar la clase "active" en el submenú
  submenuGestion.classList.toggle('active');
});

// Agregar evento clic a los elementos del submenú para evitar que se cierre
var submenuItems = submenuGestion.querySelectorAll('.submenu_item a');
submenuItems.forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.stopPropagation(); // Detener la propagación del evento clic
  });
});