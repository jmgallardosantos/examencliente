/**
 * 
 */


/************************************
*
* Funciones Generales
* 
************************************/


/**
 * Crea el contenedor de la actividad si no existe
 * Si existe lo borra para generar uno nuevo 
 */
function existeActividad(){
    if (document.getElementById("actividad")){
        content.removeChild(document.getElementById("actividad"));
    }
    
    // Crea el contenedor de la actividad
    var divac = document.createElement("div");
    divac.setAttribute("id", "actividad");
    content.appendChild(divac);
   
}

 /**
 * Recibe una cadena y devuelve la misma cadena con la primera letra en Mayúscula
 * @param {string} s 
 * @returns {string}
 */
function capitalize(s){
    return s.charAt(0).toLocaleUpperCase() + s.slice(1);
}


/************************************
*
* Actividad 6
* 
************************************/
function generaNueve(){   
    
    const ALUMNOS = [];
    const NUMALUM = 5;

    /************************************
     *
     * FUNCIONES LOCALES A LA ACTIVIDAD
     * 
     ************************************/
    /**
     * Genera la tabla de alumnos
     * @param {array} cabecera // ???????????????????????
     * @param {array} cuerpo // ?????????????????????
     */
    function crearTablaAlum(cabecera, cuerpo){
        if(document.getElementById("tabla")){
            actividad.removeChild(document.getElementById("tabla"))
        }

        var tabla = document.createElement("table");  // Creamos el elemento table.
        tabla.setAttribute("id", "tabla"); //    <table id="tabla"></table>
        
        // genera la cebecera de la tabla
        var thead = document.createElement("thead");  // Creamos el elemento thead
        var tr = document.createElement("tr"); // Creamos el elemento tr.
        
        for (e of cabecera){  //iteramos sobre el array cabecera y lo almacenamos cada iteracion en e
            var th = document.createElement("th"); // Creamos el elemento th.
            var nodoTexto = document.createTextNode(capitalize(e)); // Creamos un texto que cumpla con la funcion capitalize ?????????????
            th.appendChild(nodoTexto); // Añadimos el hijo nodotexto al padre th.
            tr.appendChild(th); // Añadimos el hijo th al padre tr.
        }
        thead.appendChild(tr); // Añadimos el hijo tr al padre thead.
        tabla.appendChild(thead);  // Añadimos el hijo thead al padre tabla
    
        // Genera el cuerpo de la tabla
        var tbody = document.createElement("tbody");
        for (fila of cuerpo){
            tr = document.createElement("tr");
            for (celda of fila){
                var td = document.createElement("td");
                nodoTexto = document.createTextNode(celda);
                td.appendChild(nodoTexto);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    
        tabla.appendChild(tbody);
    
        actividad.appendChild(tabla);
    
    }


    /**
     * Comprueba que ningun campo esté vacio
     * 
     * @param  {...any} re
     * @returns {boolean} true si hay alguno vacío
     */
    function comprobarRegistros(...re){
        let interruptor = false;
        re.forEach(e =>{
            if(e === ""){
                interruptor = true;
            }
        }); 
        return interruptor;
    }

    /**
     * Almacena a los alumnos y sus notas 
     */
    function guardarAlumno(){
       var nombre = document.getElementById("alumno").value;
       var modulo1 = document.getElementById("modulo1").value;
       var modulo2 = document.getElementById("modulo2").value;
       var modulo3 = document.getElementById("modulo3").value;

       //Si algun campo está vacío rompe la secuencia de la función
       if (comprobarRegistros(nombre, modulo1, modulo2, modulo3)){
           alert("Ningún campo puede estar vacío")
           return;
       }

       // comprueba si los campos esán en el tipo adecuado
       if (isNaN(nombre) && !isNaN(modulo1, modulo2, modulo3)){

            if ([modulo1, modulo2, modulo3].every(e => e >= 0 && e <= 10)){
                
                ALUMNOS.push([nombre,modulo1, modulo2, modulo3]);

                document.getElementById("alumno").value = "";
                document.getElementById("modulo1").value = "";
                document.getElementById("modulo2").value = "";
                document.getElementById("modulo3").value = "";

                if (ALUMNOS.length >= NUMALUM ){
                    alert("Todos los alumnos estan introducidos");
                    guardar.disabled = true;
                    generarTabla.disabled = false;
                } 

            } else{
                alert("Error: Las notas deben estar comprendidas entre 0 y 10"); 
            }

       } else{
            if(!isNaN(nombre)){
                alert(`Dato incorreco: ${nombre} no es un nombre`);
            }
            if (isNaN(modulo1, modulo2, modulo3)){
                alert("Dato incorrecto: combruebe que en los modulos las notas sean números");
            }
       }


    }


    /************************************
     *
     * CREA EL CONTENIDO DE LA ACTIVIDAD
     * 
     ************************************/

    // Combrobamos que no existe el contenedor de la actividad si existe lo borramos 
    existeActividad();
   
    var actividad = document.getElementById("actividad");



    //Crea el enunciado
    var enunciado = document.createElement("blockquote");
    var nodoTexto = document.createTextNode("9. Crear una array multidimensional que recoja los nombres de 5 alumnos y las notas obtenidas en tres módulos. Dicha información será introducida por el usuario y una vez finalizada la recogida de datos se mostrará el contenido del array en forma de tabla.");
    enunciado.appendChild(nodoTexto);
    actividad.appendChild(enunciado);
    
    //creamos el formulario
    const FORMULARIO = ["alumno", "modulo 1", "modulo 2", "modulo 3"];
   
    FORMULARIO.forEach(e =>{
        //creacion del label
        var p = document.createElement("p");
        var la = document.createElement("label");
        la.setAttribute("for", e.replace(" ", ""));
        nodoTexto = document.createTextNode(`${capitalize(e)}: `);
        la.appendChild(nodoTexto);
        p.appendChild(la);
        
        
        //creacion de los inputs
        var inp = document.createElement("input");
        inp.setAttribute("type", "text");
        inp.setAttribute("name", e.replace(" ", ""));
        inp.setAttribute("id", e.replace(" ", ""));
        p.appendChild(inp);
        
        //Metemos todo en el div
        actividad.appendChild(p);
    });

    //Generamos los botones para enviar
    var guardar = document.createElement("input");
    guardar.setAttribute("type", "submit");
    guardar.setAttribute("id", "guardar");
    guardar.setAttribute("value", "Guardar");
    actividad.appendChild(guardar);

    var generarTabla = document.createElement("input");
    generarTabla.setAttribute("type", "submit");
    generarTabla.setAttribute("id", "generarTabla");
    generarTabla.setAttribute("value", "Generar Tabla");
    generarTabla.setAttribute("disabled", "");
    actividad.appendChild(generarTabla);

    // listeners
    document.getElementById("guardar").addEventListener('click', guardarAlumno);

    document.getElementById("generarTabla")
            .addEventListener('click', () => {
                crearTablaAlum(FORMULARIO, ALUMNOS)
            });



    
}


/************************************
*
* Actividad 10 unidad 4
* 
************************************/
function generaTrece(){
    
    existeActividad();
    var actividad = document.getElementById("actividad");



    //Crea el enunciado
    var enunciado = document.createElement("blockquote");
    var nodoTexto = document.createTextNode("13. Utilice el código empleado para la generación de las instancias del objeto Vehículo, y modifíquelo para que los valores de cada una de sus propiedades se impriman en una tabla HTML. Utilice la generación de código HTML desde código JavaScript. Cada instancia del objeto debeocupar una línea y el valor de cadapropiedad debe ocupar una celda de dicha línea. El resultado debe ser similar a:");
    enunciado.appendChild(nodoTexto);
    actividad.appendChild(enunciado);
    
    var generarTabla = document.createElement("input");
    generarTabla.setAttribute("type", "submit");
    generarTabla.setAttribute("id", "generarTabla");
    generarTabla.setAttribute("value", "Generar Tabla");
    actividad.appendChild(generarTabla);

    /*************************
     * Funciones locales
     * 
     *************************/

     /**
      * Genera una tabla con los vehiculos
      * @param  {...any} vehiculos 
      */
    function crearTablaCoche(...vehiculos){
        debugger;
        
        if(document.getElementById("tabla")){
            actividad.removeChild(document.getElementById("tabla"))
        }
        
        var tabla = document.createElement("table");
        tabla.setAttribute("id", "tabla");
        
        // genera la cebecera de la tabla
        var thead = document.createElement("thead");
        var tr = document.createElement("tr");
        const CABECERA = ["Marca", "Modelo", "Color", "Año de fabricación"];
        
      
        for (e of CABECERA){
            var th = document.createElement("th");
            var nodoTexto = document.createTextNode(e);
            th.appendChild(nodoTexto);
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        tabla.appendChild(thead);
    
        // Genera el cuerpo de la tabla
        var tbody = document.createElement("tbody");
    
         for (let i = 0; i < vehiculos.length; i++){
            var tr = document.createElement("tr");
            
            for (const key in vehiculos[i]) {
                if (typeof vehiculos[i][key] != "function") {
                    var td = document.createElement("td");
                    nodoTexto = document.createTextNode(`${vehiculos[i][key]}`);
                    td.appendChild(nodoTexto);
                    tr.appendChild(td);
                }
                
            }
            tbody.appendChild(tr);
        }
        tabla.appendChild(tbody);
        actividad.appendChild(tabla);
    
    }
    
    
    //Creamos los objetos
    function Vehiculo(marca, modelo, color,ano_fab){
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.ano_fab = ano_fab;
        this.arrancar = function(){
                let texto = "El coche de marca " +  this.marca 
                + " modelo " + this.modelo
                + " color " + this.color
                + " ha arrancado";
        console.log(texto);
        }
    }
    
    var coche1 = new Vehiculo("Ferrari", "Scaglietti", "Rojo", "2010");
    var coche2 = new Vehiculo("BMW", "Z4", "Blanco", "2010");
    var coche3 = new Vehiculo("Seat", "Toledo", "Azul", "1990");
    var coche4 = new Vehiculo("Fiat", "500", "Verde", "1995");
    
    // listeners
 
    document.getElementById("generarTabla")
            .addEventListener('click', () => {
                crearTablaCoche(coche1, coche2, coche3, coche4)
            });

}

//Botones para generar las actividades
var boton6 = document.getElementById("ej6");
var boton10 = document.getElementById("ej10");
var content = document.getElementById("content");

boton6.addEventListener("click", generaNueve);
boton10.addEventListener("click", generaTrece);