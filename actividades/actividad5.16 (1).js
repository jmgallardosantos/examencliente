function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }







/**
 * Muestra los resultaos en la grágica
 */
function mostrarResultados(){
    var ios = document.getElementById("iosp");
    var android = document.getElementById("androidp");
    var wp = document.getElementById("wpp");
    var otros = document.getElementById("otrop");
    let total = 0;
    ["ios", "android", "wp", "otro"].forEach(e =>{
        total += getCookie(e) !== "" ? parseInt(getCookie(e)) : 0;
    });

    ios.max= total;
    ios.value = getCookie("ios") !== "" ? parseInt(getCookie("ios")) : 0;
    android.max= total;
    android.value = getCookie("android") !== "" ? parseInt(getCookie("android")): 0;
    wp.max= total;
    wp.value = getCookie("wp") !== "" ? parseInt(getCookie("wp")) : 0;
    otros.max= total;
    otros.value = getCookie("otros") !== "" ? parseInt(getCookie("otros")) : 0;
  
}

function votar(){
    var voto = document.getElementsByName('so');
    for(let i = 0; i < voto.length; i++){
        if(voto[i].checked){
            var nombre = voto[i].value;
        }
    } 
    let valor = getCookie(nombre) !== "" ? parseInt(getCookie(nombre)): 0;
    setCookie(nombre, valor + 1, 100000000);
 
}


function iniciar(){
    
    document.getElementById("votar").addEventListener('click', votar);
    
    mostrarResultados();
    
}

window.onload = iniciar;
