function abrirModalDetalles(detalles){
    const detallesObj = JSON.parse(decodeURIComponent(detalles));
    $("#detalle_tracking").html(detallesObj.tracking)
    $("#detalle_contenido").html(detallesObj.contenido)
    $("#detalle_pesolbs").html(detallesObj.pesoLbs)
    $("#detalle_pesokg").html(detallesObj.pesoKg)
    $("#detalle_pesovol").html(detallesObj.pesoVol)
    $("#detalle_fechaentrega").html(detallesObj.fechaEntrega)
    $("#scrollable-modal").modal('show')
}




function consultarPaquetes(){
    abrirSpinner("Espere mientras se carga sus paquetes")
    API_GET(null, '/obtenerPaquetes', datos => {
        if (datos.estado) {
            desarmarTrackings(datos.datos)
        } else {
            cerrarSpinner()
           
        }
    });
}


async function desarmarTrackings(paquetes){
    datosGlobales = []
    if(paquetes){
        for (let element of paquetes) {
            await consultarTrackings(element);  // Espera a que cada tracking se resuelva antes de continuar
        }
        construirDom()
    }
    else{
        mensajeUsuario("info", "Oooops....", "No se encontraron paquetes")
    }
    setTimeout(() => {
        cerrarSpinner()
    }, 1000);
    
}

var datosGlobales = []
async function consultarTrackings(datosBase) {
    let info = {
        tracking: parseInt(datosBase.numero_tracking),
        datosBase: datosBase,
        datosApi: {}
    }
    return new Promise((resolve, reject) => {
        API_GET(null, '/validarTracking/' + info.tracking, datos => {
            if (datos.estado) {
                info.datosApi = datos.datos
                datosGlobales.push(info)
                resolve();  // Resuelve la promesa si todo va bien
            } else {
                mensajeUsuario('info', 'Oooops', datos.mensaje);
                reject(datos.mensaje);  // Rechaza la promesa en caso de error
                cerrarSpinner()
            }
        },false);
    });
}

function construirDom(){
    let lista = ""
    console.log(datosGlobales)
    datosGlobales.forEach(element => {
        const datosApi = validarApi(element.datosApi)
        const detalles = {
            tracking: element.tracking,
            contenido: datosApi.contenido,
            pesoLbs: datosApi.Peso,
            pesoKg: datosApi.Peso_kg,
            pesoVol: datosApi.Peso_volumen,
            fechaEntrega: datosApi.Fecha_Entrega,
        }
        lista += `
            <tr>
                <td>`+element.tracking+`</td>
                <td>`+datosApi.Estado_Envio+`</td>
                <td>`
                if(element.datosBase.idDireccion == null){
                    lista += `OFICINAS VIP COURIER`
                }else{
                    lista += element.datosBase.aliasDireccion
                }
                lista += `
                </td>
                <td>`+datosApi.contenido+`</td>
                <td>`+element.datosBase.precio+`</td>
                <td>`+element.datosBase.pagado+`</td>
                <td>
                    <div class="icon-item">
                        <a href="#" onclick="abrirModalDetalles('`+encodeURIComponent(JSON.stringify(detalles))+`'); return false;">
                            <i data-feather="search" class="icon-dual"></i>
                            <span>Ver <i class="icon-eye"></i></span>
                        </a>
                    </div>
                </td>  
            </tr>
    `
    });
    
    $("#listadoPaquetes").html(lista)
}


function validarApi(datosApi){
    if(!datosApi){
        const data ={
            Estado_Envio: "POR VALIDAR",
            contenido: "POR VALIDAR",
            Fecha_Entrega: "POR VALIDAR",
            Peso: "POR VALIDAR",
            Peso_kg: "POR VALIDAR",
            Peso_volumen: "POR VALIDAR",
            Fecha_Entrega: "POR VALIDAR",
        } 
        return data
    }
    return datosApi
}
