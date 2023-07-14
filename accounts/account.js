import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, fs, collection, getDocs, setDoc, doc, getDoc, updatePassword } from "../database/firebase.js";

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
            location.reload();
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
                <div class="modal fade" id="datos-habitacion-${reservas.id}"tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h3>Habitación Nº${reservas.id}</h3>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div id="aviso-reservas"></div>
                            <div class="modal-body">
                                <form id="_${reservas.id}">

                                    <label for="nombres-${reservas.id}">Nombres:</label>
                                    <input type="text" id="reserva-nom-${reservas.id}" class="form-control mb-3" value="${reserva.nombre}">

                                    <label for="dni-${reservas.id}">DNI:</label>
                                    <input type="text" id="reserva-dni-${reservas.id}" class="form-control mb-3" value="${reserva.dni}">

                                    <label for="fecha-entrada-${reservas.id}">Fecha Entrada:</label>
                                    <input type="date" id="reserva-fech-entra-${reservas.id}" class="form-control mb-3" value="${reserva.fecha_entrada}">

                                    <label for="fecha-salida-${reservas.id}">Fecha Salida:</label>
                                    <input type="date" id="reserva-fech-sal-${reservas.id}" class="form-control mb-3" value="${reserva.fecha_salida}">

                                    <label for="estado-${reservas.id}">Estado:</label>
                                    <select id="seleccion-${reservas.id}" class="form-select" size="3">
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
                            <img class="img-habitaciones asd1" src="${imgurl}" alt="">
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
        const useremail = await getDoc(doc(fs, "type_accounts", `${user.email}`));
        if(useremail.data().tipo == 'Admin'){
            logueado(navlogin, navregis, navcerrar);
            const ul = `
            <div style="width: 700px; margin: 20px" class="titulo-habitaciones">
                <h3>Gestión de datos para Administradores</h3>
            </div>
            <div class="contenedor">
                <div class="rounded border-success" style="width: 450px; padding:10px; margin: 10px; border: 3px solid">
                    <form id="register-y-update-user">
                        <div class="contenedor">
                            <h3>Administrar un usuario</h3>
                        </div>
                        <div style="padding-top: 20px">
                            <div id="msg-user">

                            </div>
                            <label class="form-label">Email:</label>
                            <div class="input-group mb-3">
                                <input id="nombre-user" type="text" class="form-control" placeholder="nombre">
                                <span class="input-group-text">@</span>
                                <input id="dominio-user" type="text" class="form-control" placeholder="dominio">
                            </div>
                            <label class="form-label">Contraseña:</label>
                            <div class="input-group mb-3">
                                <input id="password-user" type="text" class="form-control" placeholder="Contraseña">
                            </div>
                            <label style="width: 100%" class="form-label">Tipo de cuenta:</label>
                            <div style="width: 100%" class="btn-group-vertical" role="group">
                                <input id="btn-admin" type="radio" class="btn-check" name="tipo-user">
                                <label class="btn btn-outline-dark" for="btn-admin">Administrador</label>
                                <input id="btn-recep" type="radio" class="btn-check" name="tipo-user" checked>
                                <label class="btn btn-outline-dark" for="btn-recep">Recepcionista</label>
                            </div>
                            <div style="width: 100%; padding-top:10px" class="contenedor">
                                <button id="register-user" style="width: 47%; margin:3%" type="button" class="btn btn-success">Registrar</button>
                                <button id="update-user" style="width: 47%"; margin:3%" type="button" class="btn btn-primary">Actualizar</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="rounded border-info" style="width: 450px; padding:10px; margin: 10px; border: 3px solid">
                    <form id="register-y-update-hab">
                        <div class="contenedor">
                            <h3>Administrar una habitación</h3>
                        </div>
                        <div style="padding-top: 20px">
                            <label class="form-label">Habitación:</label>
                            <div id="msg-hab">

                            </div>
                            <div class="input-group mb-3">
                                <input id="verify-hab" type="text" class="form-control" placeholder="Número de habitación">
                                <button id="btn-verify-hab" class="btn btn-outline-success" type="button">Verificar</button>
                            </div>
                            <label class="form-label">Precio:</label>
                            <div class="input-group mb-3">
                                <span class="input-group-text">S/</span>
                                <input id="precio-hab" type="text" class="form-control">
                                <span class="input-group-text">.00</span>
                            </div>
                            <div style="margin-top: 20px" class="input-group">
                                <span class="input-group-text">Descripción:</span>
                                <textarea id="desc-hab" class="form-control"></textarea>
                            </div>
                            <label style="width: 100%; margin-top: 20px" class="form-label">Tipo de habitación:</label>
                            <div style="width: 100%" class="contenedor">
                                <input id="tipo-hab-indiv" type="radio" class="btn-check" name="tipo-hab" checked>
                                <label style="width: 29%; margin:1%" class="btn btn-outline-dark" for="tipo-hab-indiv">Individual</label>
                                <input id="tipo-hab-dual" type="radio" class="btn-check" name="tipo-hab">
                                <label style="width: 29%; margin:1%" class="btn btn-outline-dark" for="tipo-hab-dual">Dual</label>
                                <input id="tipo-hab-fam" type="radio" class="btn-check" name="tipo-hab">
                                <label style="width: 29%; margin:1%" class="btn btn-outline-dark" for="tipo-hab-fam">Familiar</label>
                            </div>
                            <div style="width: 100%; padding-top: 10px" class="contenedor">
                                <button id="register-hab" style="width: 47%; margin:3%" type="button" class="btn btn-success">Registrar</button>
                                <button id="update-hab" style="width: 47%"; margin:3%" type="button" class="btn btn-primary">Actualizar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                `;
            muestra_pantalla.innerHTML = ul;

            const register_user = document.querySelector('#register-user');
            register_user.addEventListener('click', async e =>{
                const nombre_user = document.querySelector('#nombre-user').value;
                const domain_user = document.querySelector('#dominio-user').value;
                const pass_user = document.querySelector('#password-user').value;
                
                const email = nombre_user + "@" + domain_user;
    
                const form = document.getElementById('register-y-update-user');
                const msg = document.getElementById('msg-user');
                var type_user = '';
    
                if(document.getElementById('btn-admin').checked){
                    type_user = 'Admin';
                } else{
                    type_user = 'Recep';
                }

                createUserWithEmailAndPassword(auth, email, pass_user)
                .then(async (userCredential) => {
                    console.log("Usuario registrado");
                    await setDoc(doc(fs, 'type_accounts', email), {
                        tipo: type_user
                    });
                })
                .catch((error) => {
                    form.reset();
                    console.log("El usuario no se pudo registrar", error)
                    var mensaje = '';
                    if(error == 'FirebaseError: Firebase: Error (auth/invalid-email).'){
                        mensaje = '<p class="error" >Email inválido</p>';
                    } else if(error == 'FirebaseError: Firebase: Error (auth/email-already-in-use).'){
                        mensaje = '<p class="error" >El email ya ha sido registrado</p>';
                    } else{
                        mensaje = '<p class="error" >Ocurrió un error inesperado</p>';
                    }
                    msg.innerHTML = mensaje;
                    form.reset();
                });
            });

            const update_user = document.querySelector('#update-user');
            update_user.addEventListener('click', async e => {
                const nombre_useru = document.querySelector('#nombre-user').value;
                const domain_useru = document.querySelector('#dominio-user').value;
                const pass_useru = document.querySelector('#password-user').value;
                
                const emailu = nombre_useru + "@" + domain_useru;
    
                const formu = document.getElementById('register-y-update-user');
                const msgu = document.getElementById('msg-user');
                var type_useru = '';

                if(document.getElementById('btn-admin').checked){
                    type_useru = 'Admin';
                } else{
                    type_useru = 'Recep';
                }
                
                if(pass_useru != ''){
                    //updatePassword(emailu, pass_useru).then(async (e) => {
                    //    msgu.innerHTML = '<p class="success" >Datos actualizados correctamente</p>'
                    //    
                    //    await setDoc(doc(fs, 'type_accounts', emailu), {
                    //        tipo: type_useru
                    //    });
                    //}).catch((error) => {
                    //    msgu.innerHTML = '<p class="error" >Ocurrió un error</p>'
                    //    console.log(error);
                    //});
                } else{
                    await setDoc(doc(fs, 'type_accounts', emailu), {
                        tipo: type_useru
                    });
                    msgu.innerHTML = '<p class="success" >El tipo de cuenta del usuario se ha actualizado</p>'
                }
            });

            const verify_hab = document.querySelector('#btn-verify-hab');
            verify_hab.addEventListener('click', async => {
                console.log('nosee')
            });

            const register_hab = document.querySelector('#register-hab');
            register_hab.addEventListener('click', async e =>{
                console.log('nosi')
            });

            const update_hab = document.querySelector('#update-hab');
            update_hab.addEventListener('click', async e => {
                console.log('si se')
            });

        } else{
            console.log('No admin');
            const habitaciones = await getDocs(collection(fs, 'habitaciones'));
            const datos = await getDocs(collection(fs, 'reservas'));
            setupHabitaciones(habitaciones, datos);
            logueado(navlogin, navregis, navcerrar);
    
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
        };
        $("#signinModal").modal('hide');
    }
    else{
        console.log('SignOut');

        const div = `
        <div class="contenedor titulo">
            <h1>
                Sección de administración
            </h1>
        </div>
        <div class="descripcion p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-ends" id="principal" style="background-color: ">
            <h7>
                La pagina consiste en un sistema de gestión hotelera, la cual tiene dos accesos a ella, una es como "recepcionista", la cual se encarga de gestionar las habitaciones como personal de recepción presencialmente en el hotel mismo y el otro acceso es como "administrador", el cual tiene mas acceso a la misma pagina, teniendo control de crear nuevas cuentas con acceso y gestionar los empleados.
            </h7>
            <main class="menu-si">
                <div class="card-si">
                    <img class="img-si" src="https://images.unsplash.com/photo-1656618020911-1c7a937175fd?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTc1MzQyNTE&ixlib=rb-1.2.1&q=80" alt="">
                    <div class="card-content">
                        <h2 class="h2-si">
                            Recepcionista:
                        </h2>
                        <p class="p-si">
                            Encargado de gestionar las habitaciones como personal de recepción presencialmente en el hotel mismo
                        </p>
                    </div>
                </div>
                <div class="card-si">
                    <img class="img-si" src="https://images.unsplash.com/photo-1656618020911-1c7a937175fd?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTc1MzQyNTE&ixlib=rb-1.2.1&q=80" alt="">
                    <div class="card-content">
                        <h2 class="h2-si">
                            Administrador:
                        </h2>
                        <p class="p-si">
                        Tiene mas acceso a la misma pagina, teniendo control de crear nuevas cuentas con acceso y gestionar los empleados
                        </p>
                    </div>
                </div>
            </main>
        </div>
        `;
        muestra_pantalla.innerHTML = div;
        nologueado(navlogin, navregis, navcerrar);


    }
});