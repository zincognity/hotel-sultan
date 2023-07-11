const btnToggle = document.querySelector('.btn-menu');

btnToggle.addEventListener('click', function () {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
});

// document.addEventListener('click', function(event) {
//     var acordeon = document.querySelector('.acordeon');
//     var target = event.target;
    
//     if (!acordeon.contains(target)) {
//       var checkboxes = acordeon.querySelectorAll('input[type="checkbox"]');
      
//       checkboxes.forEach(function(checkbox) {
//         checkbox.checked = false;
//       });
//     }
//   });
  



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
    e.stopPropagation(); // Detener la propagación del evento clic
  });
});



// Obtener el elemento del menú "Gestión de habitaciones"
var menuAcceso = document.querySelector('.menu_7');

// Obtener el submenú de gestión de habitaciones
var submenuAcceso = menuAcceso.querySelector('.submenu-acceso');

// Agregar evento clic al menú "Gestión de habitaciones"
menuAcceso.addEventListener('click', function(e) {
  // Alternar la clase "active" en el submenú
  submenuAcceso.classList.toggle('active');
});

// Agregar evento clic a los elementos del submenú para evitar que se cierre
var submenuItemsacceso = submenuAcceso.querySelectorAll('.txtsubmenu-acceso');
submenuItemsacceso.forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.stopPropagation(); // Detener la propagación del evento clic
  });
});




// Boton para que el cuadro de "contenid_fuera / la pantalla principal, se mueva al abrir el menú"
const btnTogglee = document.querySelector('.btn-menu');

btnTogglee.addEventListener('click', function () {
    const menu = document.querySelector('.contenido_fuera');
    menu.classList.toggle('active');
});

  
// Botones de opciones para la gestión de habitaciones
// const opciones = document.querySelectorAll('.opciones input[type="checkbox"]');

// opciones.forEach((opcion) => {
//   opcion.addEventListener('change', () => {
//     if (opcion.checked) {
//       opciones.forEach((otraOpcion) => {
//         if (otraOpcion !== opcion) {
//           otraOpcion.checked = false;
//         }
//       });
//     }
//   });
// });

// Función = Selección de tipo de habitaciones, al dar click en disponible que solo aparezcan los disponible y asi en RES y MAN
const opciones = document.querySelectorAll('.opciones input[type="checkbox"]');
const cuadros = document.querySelectorAll('.box');
const opcionTodos = document.querySelector('.opcion_todos');
const cuadrosDeCuadros = document.querySelector('.cuadro_de_cuadros');

opcionTodos.addEventListener('click', () => {
  if (!opcionTodos.checked) {
    opcionTodos.checked = true;
  }
  mostrarTodosLosCuadros();
});

opciones.forEach((opcion) => {
  opcion.addEventListener('change', () => {
    if (opcion === opcionTodos && !opcion.checked) {
      opcion.checked = true;
    } else if (opcion.checked) {
      opciones.forEach((otraOpcion) => {
        if (otraOpcion !== opcion && otraOpcion.checked) {
          otraOpcion.checked = false;
        }
      });

      const opcionValue = opcion.getAttribute('value');

      cuadros.forEach((cuadro) => {
        const cuadroClassList = cuadro.classList;
        if (cuadroClassList.contains(opcionValue)) {
          cuadro.style.display = 'flex';
        } else {
          cuadro.style.display = 'none';
        }
      });
    } else {
      mostrarTodosLosCuadros();
      opcionTodos.checked = true;
    }

    actualizarEstiloBotonTodos();
  });
});

function mostrarTodosLosCuadros() {
  cuadros.forEach((cuadro) => {
    cuadro.style.display = 'flex';
  });
  cuadrosDeCuadros.style.display = 'flex';
}

function actualizarEstiloBotonTodos() {
  if (opcionTodos.checked) {
    opcionTodos.classList.add('.box');
  } else {
    opcionTodos.classList.remove('.box');
  }
}

// Función de cuadro extra, al dar click en cualquier cuadro.
const cuadrosExtras = document.querySelectorAll('.box');
const informacionExtra = document.querySelector('.cuadro-extra');
const btnProceder = document.querySelector('.CIC-btn1');

cuadrosExtras.forEach((cuadro) => {
  cuadro.addEventListener('click', (event) => {
    // Verificar si el clic se realizó en el cuadro de información extra
    if (!event.target.closest('.cuadro-extra')) {
      cuadro.classList.toggle('active');
      informacionExtra.style.display = cuadro.classList.contains('active') ? 'block' : 'none';
    }
  });
});
// Función para que se oculte al dar click en "CIC-btn2"
btnProceder.addEventListener('click', (event) => {
  event.stopPropagation();
  informacionExtra.style.display = 'none';
});









