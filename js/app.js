const ingresos = [
    new Ingreso('Sueldo', 5500000),
    new Ingreso('Vaca Jersey', 8500000),
    new Ingreso('Ventas vacas-Normando', 750000000)
];

const egresos = [
    new Egreso('Alquiler Tractor.', 1200000),
    new Egreso('Insumos de campo', 132850300),
    new Egreso('Pagos a personales', 72000000),
];
// carga de la pagina
let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

// calculo de saldos y totales
let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

// actualizacion de los datos de forma dinamica segun datos por defecto o datos proporcionados
let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = '+' + formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = '-'+ formatoMoneda(totalEgresos());
}

// formatos para presentacion (moneda y porcentaje)
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('es-PY', {style:'currency', currency:'PYG', minimumFractionDigits:0});
}
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('es-PY',{style:'percent',minimumFractionDigits:2});
}

// actualizacion dinamica del listado de los ingresos y egresos
const cargarIngresos = ()=>{
    let ingresosHTML = '';

    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso)=>{
    let ingresosHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="trash-outline" onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>`;
    return ingresosHTML;
}

const cargarEgresos = ()=>{
    let egresosHTML = '';

    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso)=>{
    let egresosHTML = `<div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="trash-outline" onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>`;
    return egresosHTML;
}

// eliminacion de ingresos y egresos

const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);// se envia una funcion flecha que indica por cada objeto ingreso se hace una comparacion del id del objeto iterado con un id proporcionado, esta funcion retorna el indice
    ingresos.splice(indiceEliminar, 1);
    // actualizamos datos
    cargarCabecero();
    cargarIngresos();

}

const eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);// se envia una funcion flecha que indica por cada objeto egreso se hace una comparacion del id del objeto iterado con un id proporcionado, esta funcion retorna el indice a eliinar si se encuentra tal indice
    egresos.splice(indiceEliminar, 1);
    // actualizamos datos
    cargarCabecero();
    cargarEgresos();

}

// agregamos ingresos o egresos

let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push( new Egreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarEgresos();
        }
    }
}

