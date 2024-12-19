

function consultarClientes(){
    info = {buscador:""}
    API_POST(JSON.stringify(info), '/obtenerPaquetesCompletos', datos => {
        if (datos.estado){
            armarTrackings(datos.datos)
        }else{
            mensajeUsuario('info','Oops...',datos.mensaje)
        }
    })
}



function armarTrackings(trackings){
    let lista = ""
    trackings.forEach((element) => {
        lista += `
            <tr>
                <th>`+element.numero_tracking+`</th>
                <td>`+element.primerNombre+` `+element.segundoNombre+` `+element.primerApellido+` `+element.segundoApellido+` <br>
                    <span class="badge label-table" style="background-color: #99c21c;">CI: `+element.cedula+`</span>
                    <span class="badge label-table" style="background-color:rgb(28, 161, 194);">Tel: `+element.telefono+`</span>
                </td>
                 <td>`+element.calle_principal+` `+element.numeracion+` y `+element.calle_secundaria+`<br>
                    <span class="badge label-table" style="background-color:rgb(147, 148, 145);">`+element.provincia+` - `+element.ciudad+` - `+element.sector+`</span>
                    <span class="badge label-table" style="background-color:rgb(147, 148, 145);">REF: `+element.referencia+`</span>
                </td>
                <td>
                    <a href="#" onclick="descargarVoucher(`+element.idTracking+`); return false;">Ver voucher subido</a>
                </td>
            </tr>
        `
    });
    $("#listaClientes").html(lista)
}


function descargarVoucher(idTracking){
    API_GET(null, '/descargarVoucherTracking/'+idTracking, datos => {
        if (datos.estado) {
            base64ADescargar(datos.datos, "voucher")
        } else {
            mensajeUsuario('info', 'Oops...', datos.mensaje);
        }
    });
}



function base64ADescargar(base64String, nombreArchivo) {
    // Separar la cabecera y el contenido base64
    const [header, base64Content] = base64String.split(',');

    // Crear un blob con el contenido base64 decodificado
    const blob = new Blob([new Uint8Array(atob(base64Content).split('').map(c => c.charCodeAt(0)))], {
        type: header.split(';')[0].replace('data:', '')
    });

    // Crear un enlace para descargar el archivo
    const enlace = document.createElement('a');
    const url = URL.createObjectURL(blob);
    enlace.href = url;
    enlace.download = nombreArchivo;

    // Programar el clic para iniciar la descarga
    document.body.appendChild(enlace);
    enlace.click();

    // Limpiar el DOM
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
}

function buscarTracking(){
    const info = {
        buscador: document.getElementById("trackingBuscar").value
    }
    API_POST(JSON.stringify(info), '/obtenerPaquetesCompletos', datos => {
        if (datos.estado){
            armarTrackings(datos.datos)
        }else{
            mensajeUsuario('info','Oops...',datos.mensaje)
        }
    })
}




