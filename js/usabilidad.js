//Función para cambiar la hoja de estilos a "Alto contraste"
function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href=archivo;
    localStorage.estilos=archivo;
}


        var fontSize = 1.1;

        // funcion para aumentar la fuente
        function zoomIn() {
            fontSize += 0.1;
            document.body.style.fontSize = fontSize + "em";
            if (fontSize == 1.1){
     document.getElementById("restaurar").style.display = "none";

 }
else{
    document.getElementById("restaurar").style.display = "block";
   
} if(fontSize >= 2.1){
     document.getElementById("aumentar").style.display = "none";
     }
            
        }
 
        // funcion para disminuir la fuente
        function zoomOut() {
            fontSize -= 0.1;
            document.body.style.fontSize = fontSize + "em";
     document.getElementById("aumentar").style.display = "block";
            if (fontSize == 1.1){
     document.getElementById("restaurar").style.display = "none";
   
 }
        }

