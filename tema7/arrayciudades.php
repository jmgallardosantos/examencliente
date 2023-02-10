<?php
    // Array de ciudades

    $ci = ["Sanlucar", "Jerez", "Puerto de Santa Maria", "Chipiona", "Sevilla", "Sanlucar la Mayor", "Jerez de los caballeros"];

    //Capturar el valor del input que viene de la url

    $nombre = $_REQUEST["ciudad"];
    $sugerencia = "";
    //Comprobaciones

    if($ciudad !==""){
        $ciudad = strtolower($nombre); //pasamos el nombre a minusculas
        $long = strlen($nombre); //

        foreach($ci as $nom){ //Cada elemento del array lo pasa a $nom en cada iteracion
            if (stristr($ciudad, substr($nom, 0, $long))){
                if($sugerencia === ""){
                    $sugerencia = $nom;
                }else {
                    $sugerencia = "$sugerencia, $nom";
                }
            } // stristr compara dos cadenas y la i del medio independiente si es minuscula

            
        }
    }
    echo ($sugerencia ==="")?"No hay sugerencias":$sugerencia;

    ?>