import { transacciones } from "./transacciones.js"

const gastos = transacciones;

const subForm = document.getElementById("sub-form");

let otra = false;
let descripcion;
let categoria;
let mes = 0;
let costo = 0;
let id = 0;

class Gasto{
    constructor(id,descripcion,categoria,mes,costo){
        this.id = parseInt(id);
        this.descripcion = descripcion.toUpperCase();
        this.categoria = categoria.toUpperCase();
        this.mes = parseInt(mes);
        this.costo = parseFloat(costo);
    }
}

function agregarGastos(){
    let id = Math.max.apply(Math, gastos.map(function(o) { return o.id; })) + 1;
    let descripcion = subForm["descripcion"];
    let categoria = subForm["categoria"];
    let mes = subForm["mes"];
    let costo = subForm["costo"];
    gastos.push(new Gasto(id,descripcion,categoria,mes,costo));
    agregarATabla();
    guardarSes("listaGastos",JSON.stringify(gastos));
}

function limpiarTabla(){
    let tbl = document.getElementById("tablaTransacciones");
    var rowCount = tbl.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        tbl.deleteRow(i);
    }
}

function agregarATabla(){

    limpiarTabla();
    
    let tbody = document.getElementById("tbody");
    
    for (const elemento of gastos)
    {    
        let row = document.createElement("tr");
        let tabid = document.createElement("td");
        tabid.innerHTML = `${elemento.id}`;
        let tabdes = document.createElement("td");
        tabdes.innerHTML = `${elemento.descripcion}`;
        let tabcat = document.createElement("td");
        tabcat.innerHTML = `${elemento.categoria}`;
        let tabmes = document.createElement("td");
        tabmes.innerHTML = `${elemento.mes}`;
        let tabcos = document.createElement("td");
        tabcos.innerHTML = `${elemento.costo}`;

        row.appendChild(tabid);
        row.appendChild(tabdes);
        row.appendChild(tabcat);
        row.appendChild(tabmes);
        row.appendChild(tabcos);
        tbody.appendChild(row);

    }        
}

function eliminarGastos(){
    let indice = parseInt(prompt("Ingrese el ID del gasto a eliminar"));
    swal({
        title: "Estás seguro?",
        text: "Una vez que lo elimines, no podrás volver a recuperar la línea",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            const removeIndex = gastos.findIndex( item => item.id === indice );
            gastos.splice( removeIndex, 1 );
            agregarATabla();
            graficarDona();
            graficarBarra();
            guardarSes("listaGastos",JSON.stringify(gastos));
            swal("Se ha eliminado la linea!", {
                icon: "success",
            });
        } else {
            swal("La linea está a salvo!");
        }
    });

}

function calcularTotal(){
    const total = gastos.reduce((acc,el) => acc + el.costo,0);
    swal({
        title: "Gastos Totales",
        text: `El total gastado hasta el momento es $${total}`,
        icon: "success",
    });
}

const guardarSes = (clave,valor) => {
    localStorage.setItem(clave,valor)
}


let agregar = document.getElementById("agregar");
agregar.addEventListener("click",agregarGastos);

//let eliminar = document.getElementById("eliminar");
//eliminar.addEventListener("click",eliminarGastos);

let calcular = document.getElementById("calcular");
calcular.addEventListener("click",calcularTotal);

document.addEventListener("DOMContentLoaded", agregarATabla);


