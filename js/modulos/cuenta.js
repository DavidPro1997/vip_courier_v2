function verificarDatos() {
    API_GET(null, '/datosPersonales', datos => {
        if (datos.estado) {
            armartitulo(datos.datos.nombre)
            armarInformacion(datos.datos)
        } else {
            mensajeUsuario('info', 'Oooops', datos.mensaje);
        }
    });
}

function armartitulo(nombre){
    const name = nombre.split(' ')[0]
    $("#nombre").html("¡Hola "+name+"!")

}

function armarInformacion(datos){
    let lista = ""
    lista += `
        <tr>
            <td>Nombre</td>
            <td>`+datos.nombre+`</td>         
        </tr>
        <tr>
            <td>Apellido</td>
            <td>`+datos.apellido+`</td>          
        </tr>
        <tr>
            <td>Correo</td>
            <td>`+datos.correo+`</td>    
        </tr>
        <tr>
            <td>Número de Teléfono</td>
            <td>`+datos.telefono+`</td>
        </tr>
        <tr>
            <td>Fotografía</td>
            <td>
                <a href="#" onclick="document.getElementById('fileInput').click(); return false">Añadir/Cambiar</a>
            </td>
        </tr>
    `
    $("#datosPersonales").html(lista)
    if(datos.imgBase64){
        mostrarImagenDesdeBase64(datos.imgBase64)
    }
}



function previewImage(event) {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
        const reader = new FileReader(); // Crea un objeto FileReader
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result; // Cambia la fuente de la imagen
        };
        reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
}


var base64String = null; // Definimos base64String en un ámbito global para ambas funciones
function editarFoto() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader(); // Crea un nuevo objeto FileReader
        reader.onloadend = function() {
            base64String = reader.result; // Asigna el resultado a la variable global base64String
            sendInfo(); // Llama a sendInfo después de cargar la imagen
        };
        reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    } else {
        sendInfo(); // Llama a sendInfo directamente si no hay archivo
    }
}

function sendInfo() {
    const info = {};
    if (base64String) info.imagen = base64String;
    if (Object.keys(info).length > 0) {
        API_POST(JSON.stringify(info), '/editarFotografia', datos => {
            if (datos.estado) {
                mensajeUsuario('success', 'Bien', datos.mensaje);
            } else {
                mensajeUsuario('info', 'Oops...', datos.mensaje);
            }
        });
    } else {
        mensajeUsuario('info', 'Oops...', "No se ha seleccionado ninguna imagen.");
    }
}



function mostrarImagenDesdeBase64(base64String) {
    const imgPreview = document.getElementById('imagePreview');
    if (imgPreview && base64String) {
        // Elimina cualquier prefijo "data:image/png;base64,"
        if (base64String.startsWith('data:image')) {
            base64String = base64String.split(',')[1];
        }

        // Elimina espacios, saltos de línea y caracteres no válidos
        base64String = base64String.replace(/\s+/g, '').replace(/[^A-Za-z0-9+/=]/g, "");

        try {
            // Decodifica la cadena base64
            const byteCharacters = atob(base64String);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
                const slice = byteCharacters.slice(offset, offset + 1024);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                byteArrays.push(new Uint8Array(byteNumbers));
            }

            // Crea un blob y muestra la imagen
            const blob = new Blob(byteArrays, { type: 'image/png' });
            const url = URL.createObjectURL(blob);
            imgPreview.src = url;
        } catch (error) {
            console.error('Error al decodificar la cadena base64:', error);
        }
    } else {
        console.error('Elemento de imagen no encontrado o base64 vacío');
    }
}



function editarPerfil() {
    const nombres = document.getElementById("nombres").value;
    const apellidos = document.getElementById("apellidos").value;
    const telefono = document.getElementById("telefono").value;
    if(nombres && apellidos && telefono){
        const info = {
            nombres: nombres,
            apellidos: apellidos,
            telefono : telefono
        };
        API_POST(JSON.stringify(info), '/editarDatosPersonales', datos => {
            if (datos.estado) {
                localStorage.setItem("authToken",datos.nuevo_token)
                mensajeUsuario('success','¡Bien!',datos.mensaje).then(() => {
                    window.location.href = "/cuenta";
                });
            } else {
                mensajeUsuario('info', 'Oops...', datos.mensaje);
            }
        });
    }
    else{
        mensajeUsuario('info', 'Oooops...', "Llene todos los campos")
    }    
}



function editarContrasena(){
    const old = document.getElementById("old_password").value
    const nueva = document.getElementById("new_password").value
    const conf_new = document.getElementById("confirm_new_password").value
    if(old && nueva && conf_new){
        const info = {
            antigua: old,
            nueva: nueva,
            nueva2 : conf_new
        };
        API_POST(JSON.stringify(info), '/editarPassword', datos => {
            if (datos.estado) {
                mensajeUsuario('success', 'Bien', datos.mensaje);
            } else {
                mensajeUsuario('info', 'Oops...', datos.mensaje);
            }
        });
    }
    else{
        mensajeUsuario('info', 'Oooops...', "Llene todos los campos")
    } 

}