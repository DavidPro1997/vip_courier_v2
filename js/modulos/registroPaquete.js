async function registrarPaquete(){
    const fileInput = document.getElementById('pdfInput');
    const file = fileInput.files[0];
    let data = {}
    if (file) {
        const base64 = await convertToBase64(file);
        data = {
            archivo: base64,
            tracking: document.getElementById("tracking").value,
            observaciones: document.getElementById("observaciones").value, // Puedes incluir el tracking del archivo si deseas
        };
    }
    enviarDatos(data)
}


function enviarDatos(datos){
    if(datos.archivo && datos.tracking){
        API_POST(JSON.stringify(datos), '/ingresoPaquete', datos => {
            if (datos.estado) {
                mensajeUsuario('success', 'Bien', datos.mensaje).then(() => {
                    window.location.href = "/paquetes";
                });
            } else {
                mensajeUsuario('info', 'Oops...', datos.mensaje);
            }
        });
    }else{
        mensajeUsuario("info","Ooops...","Debe llenar todos los campos")    }
}


function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result); 
        reader.onerror = error => reject(error);
    });
}