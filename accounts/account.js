import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, fs, collection, getDocs, setDoc, Timestamp, doc, getDoc } from "../database/firebase.js";

const loginform = document.querySelector("#login-form");

const errorlogin = document.querySelector('#error-login');

loginform.addEventListener("submit", (e) => {
    e.preventDefault();

    const loginemail = document.querySelector("#login-email").value;
    const loginpass = document.querySelector("#login-password").value;

    console.log(loginemail, loginpass);

    signInWithEmailAndPassword(auth, loginemail, loginpass)
        .then((userCredential) => {
            console.log(userCredential.user, "Ha ingresado a su cuenta");
            errorlogin.innerHTML = '<p class="success">Ingresando...</p>';
            loginform.reset();
        })
        .catch((error) => {
            console.log("El usuario no se pudo registrar", error)
            errorlogin.innerHTML = '<p class="error">Datos incorrectos</p>';
            location.reload();
        })
});

const signupform = document.querySelector("#signup-form");
signupform.addEventListener("submit", (e) => {
    e.preventDefault();

    const signupemail = document.querySelector("#signup-email").value;
    const signuppass = document.querySelector("#signup-password").value;
    const signupconfirmpass = document.querySelector("#signup-confirmpassword").value;
    console.log("Se ha registrado un nuevo usuario:", signupemail);

    if(signuppass == signupconfirmpass){
        createUserWithEmailAndPassword(auth, signupemail, signuppass)
        .then((userCredential) => {
            signupform.reset();
            console.log("Usuario registrado");
            $("#signupModal").modal('hide');
        })
        .catch((error) => {
            console.log("El usuario no se pudo registrar", error)
        })
    } else{
        console.log("Las contraseñas no son idénticas.")
    }
});

const logout = document.querySelector('#logout')

logout.addEventListener("click", (e) => {
    e.preventDefault();

    signOut(auth)
        .then(() => {
            console.log("Se ha cerrado sesión");
        })
        .catch((error) => {
            console.log("El usuario no se pudo registrar", error)
        })
});

const muestra_pantalla = document.querySelector('.contenedor');

const navlogin = document.querySelector('.navlogin');
const navregis = document.querySelector('.navregis');
const navcerrar = document.querySelector('.navcerrar');
const reservas = document.querySelector('.reservas');

function logueado(navlogin, navregis, navcerrar) {
    navlogin.style.display = 'none';
    navregis.style.display = 'none';
    navcerrar.style.display = 'block';

};

function nologueado(navlogin, navregis, navcerrar) {
    navlogin.style.display = 'block';
    navregis.style.display = 'block';
    navcerrar.style.display = 'none';
}

const setupHabitaciones = (habitaciones, datos) => {
    if(habitaciones){
        let modal = '';
        let html = `
            <div class="titulo-habitaciones">
                <h3>Gestión de reservas de habitaciones</h3>
            </div>`;
        datos.forEach( async (reservas) => {
            const reserva = reservas.data();
            const div = `
                <div class="modal fade" id="datos-habitacion-${reservas.id}"tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3>Detalles</h3>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div id="aviso-reservas"></div>
                            <div class="modal-body">
                                <form id="_${reservas.id}">

                                    <label for="habitacion-${reservas.id}">Habitación:</label>
                                    <input type="text" id="reserva-hab-${reservas.id}" class="form-control mb-3" value="${reservas.id}" required>

                                    <label for="nombres-${reservas.id}">Nombres:</label>
                                    <input type="text" id="reserva-nom-${reservas.id}" class="form-control mb-3" value="${reserva.nombre}" required>

                                    <label for="dni-${reserva.id}">DNI:</label>
                                    <input type="text" id="reserva-dni-${reservas.id}" class="form-control mb-3" value="${reserva.dni}" required>

                                    <label for="fecha-entrada-${reserva.id}">Fecha Entrada:</label>
                                    <input type="date" id="reserva-fech-entra-${reservas.id}" class="form-control mb-3" value="${reserva.fecha_entrada}" required>

                                    <label for="fecha-salida-${reserva.id}">Fecha Salida:</label>
                                    <input type="date" id="reserva-fech-sal-${reservas.id}" class="form-control mb-3" value="${reserva.fecha_salida}" required>

                                    <label for="estado-${reservas.id}">Estado:</label>
                                    <select id="seleccion-${reservas.id}">
                                        <option value="Disponible">Disponible</option>
                                        <option value="Reservado">Reservado</option>
                                        <option value="Mantenimiento">Mantenimiento</option>
                                    </select>

                                    <button type="submit" class="btn btn-primary w-100">Guardar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            modal += div;
        });
        reservas.innerHTML = modal;

        habitaciones.forEach((habitacion) => {
            const habitacionlist = habitacion.data();
            var color;
            var imgurl;
            if(habitacionlist.disponibilidad == "Disponible"){
                color = '#4BB543';
            } else if(habitacionlist.disponibilidad == "Reservado"){
                color = "#ff3333";
            } else{
                color = "#ead61c";
            }

            if(habitacionlist.tipo == ""){
                imgurl = 'https://cdn-icons-png.flaticon.com/512/3565/3565099.png';
            } else if(habitacionlist.tipo == ""){
                imgurl = 'https://cdn-icons-png.flaticon.com/512/3565/3565099.png';
            } else{
                imgurl = 'https://cdn-icons-png.flaticon.com/512/3565/3565099.png';
            }
            
            const li = `
                <div class="habitaciones-datos" id="habitaciones-datos-${habitacion.id}" style="background-color: ${color}">
                    <div>
                        <a class="text" href="" data-bs-toggle="modal" id="__${habitacion.id}" data-bs-target="#datos-habitacion-${habitacion.id}">Habitación Nº ${habitacion.id}</a>
                    </div>
                    <div class="habitaciones-detalles">
                        <div>
                            <p>Tipo: ${habitacionlist.tipo}</p>
                            <p>Precio: ${habitacionlist.precio}</p>
                            <p>Descripción: ${habitacionlist.desc}</p>
                            <p>Estado: ${habitacionlist.disponibilidad}</p>
                        </div>
                        <div>
                            <img src="${imgurl}" alt="">
                        </div>
                    </div>
                </div>
            `;
            html += li;
        });
        muestra_pantalla.innerHTML = html;
    } else{
        muestra_pantalla.innerHTML= '<p class="text-center">No se encontraron datos</p> '
    }
};

onAuthStateChanged(auth, async (user) => {
    if(user){
        const habitaciones = await getDocs(collection(fs, 'habitaciones'));
        const datos = await getDocs(collection(fs, 'reservas'));
        setupHabitaciones(habitaciones, datos);
        logueado(navlogin, navregis, navcerrar);
        $("#signinModal").modal('hide');


        const datos_habitacion = document.querySelectorAll('a[id^="__"]');
        datos_habitacion.forEach((habitacion) => {
            habitacion.addEventListener('click', async e => {
                const num = e.target.id.replace(/[^a-zA-Z0-9 ]/g, '');
                const seleccion = document.getElementById(`habitaciones-datos-${num}`).style.backgroundColor;
                const disponibilidad = document.getElementById(`seleccion-${num}`);
                
                console.log(seleccion)
                if(seleccion == 'rgb(75, 181, 67)'){
                    disponibilidad.value = 'Disponible';
                } else if(seleccion == 'rgb(255, 51, 51)'){
                    disponibilidad.value = 'Reservado';
                } else{
                    disponibilidad.value = 'Mantenimiento';
                }
            });
        });


        const reservas = document.querySelectorAll('form[id^="_"]');
        reservas.forEach((reserva) => {
            reserva.addEventListener('submit', async e => {
                e.preventDefault();
                const num = e.target.id.replace(/[^a-zA-Z0-9 ]/g, '');
                const nombre = document.querySelector(`#reserva-nom-${num}`).value;
                const dni = document.querySelector(`#reserva-dni-${num}`).value;
                const fecha_entrada = document.querySelector(`#reserva-fech-entra-${num}`).value;
                const fecha_salida = document.querySelector(`#reserva-fech-sal-${num}`).value;
                
                const disponibilidad = document.getElementById(`seleccion-${num}`);
                const option_disponibilidad = disponibilidad.options[disponibilidad.selectedIndex].value;

                await setDoc(doc(fs, 'reservas', `${num}`), {
                    habitacion: num,
                    nombre: nombre,
                    dni: dni,
                    fecha_entrada: fecha_entrada,
                    fecha_salida: fecha_salida
                });
                $(`#datos-habitacion-${num}`).modal('hide');

                const datos_habitacion = await getDoc(doc(fs, "habitaciones", `${num}`));
                
                await setDoc(doc(fs, 'habitaciones', `${num}`), {
                    precio: datos_habitacion.data().precio,
                    tipo: datos_habitacion.data().tipo,
                    desc: datos_habitacion.data().desc,
                    disponibilidad: option_disponibilidad
                });
                location.reload();
            });
        });

    }
    else{
        console.log('SignOut');

        const div = `
            <div class="principal" id="principal" style="background-color: ">
                <div>
                    <h5 class="text" href="" data-bs-toggle="modal" id="__" data-bs-target="#datos-habitacion">Ingresa a tu cuenta para ver información</h5>
                </div>
                <div class="habitaciones-detalles">
                    <div>
                        <h5>Entrar como:</h5>
                        <p>Precio: </p>
                        <p>Descripción: </p>
                        <p>Estado: </p>
                    </div>
                <div>
                <img src" alt="">
            </div>
        `;
        muestra_pantalla.innerHTML = div;
        nologueado(navlogin, navregis, navcerrar);
    }
});