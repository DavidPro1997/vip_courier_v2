function abrirModalOlvidePassword(){
    $("#scrollable-modal").modal('show')
}


function conSesion(data){
    $("#homeRegistrar").show()
    $("#homePaquetes").show()
    $("#homeDirecciones").show()
    $("#registroPaquetes").show()
    $("#tusPaquetes").show()
    $("#tusDirecciones").show()
    $("#fqs").show()
    $("#contactos").show()
    $("#perfil").show()
    const nombre = data.nombre.split(' ')[0]
    const apellido =  data.apellido.split(' ')[0]
    texto = `<li><i class="icon-user" style="font-size: 16px;"></i>`+nombre+` `+apellido+`</li>`
    $("#top_links").html(texto)

}


function sinSesion(){
    $("#homeRegistrar").hide()
    $("#homePaquetes").hide()
    $("#homeDirecciones").hide()
    $("#registroPaquetes").hide()
    $("#tusPaquetes").hide()
    $("#tusDirecciones").hide()
    $("#fqs").show()
    $("#contactos").show()
    $("#perfil").hide()
    $("#top_links").html('<li><a href="/login"><i class="icon-login" style="font-size: 16px;"></i>Ingresar</a></li>')

}


function crearCuenta(){
    const info = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        correo: document.getElementById("email").value,
        password1: document.getElementById("password1").value,
        password2: document.getElementById("password2").value
    }
    API_POST(JSON.stringify(info), '/registrarUsuario', datos => {
        if (datos.estado){
            mensajeUsuario('sucess','¡Bien!',datos.mensaje)
            mensajeUsuario('sucess','¡Bien!','Inicia sesión ahora')
            window.location.href = "/login";
        }else{
            mensajeUsuario('info','Oops...',datos.mensaje)
        }
    })

}

function iniciarSesion(){
    const info = {
        correo: document.getElementById("emailSesion").value,
        password: document.getElementById("passwordSesion").value
    }
    API_POST(JSON.stringify(info), '/login', datos => {
        if (datos.estado){
            localStorage.setItem("authToken",datos.datos.token)
            localStorage.setItem("userRole",datos.datos.rol)
            mensajeUsuario('success','¡Bien!',datos.mensaje).then(() => {
                window.location.href = "/home";
            });
            
        }else{
            mensajeUsuario('info','Oops...',datos.mensaje)
        }
    })
}


function verificarAutenticacion() {
    cerrarSpinner()
    const token = localStorage.getItem("authToken");
    const rol = localStorage.getItem("userRole");
    if (!token || !rol) {
        sinSesion()
    } else {
        console.log("Verificando token")
        apiToken().then(isValid => {
            conSesion(isValid)
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
}


function apiToken() {
    return new Promise((resolve, reject) => {
        API_GET(null, '/verificarSesion', datos => {
            if (datos.estado) {
                resolve(datos.datos); // Resuelve la promesa con verdadero si el token es válido
            } else {
                sinSesion()
                reject(datos.mensaje); // Rechaza la promesa si hay un error
            }
        });
    });
}




function cerrarSesion(){
    abrirSpinner("Cerrando Sesion")
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    window.location.href = '/home';
    
}


function detectarEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Previene el comportamiento por defecto, si es necesario
        iniciarSesion();        // Llama a la función iniciarSesion
    }
}