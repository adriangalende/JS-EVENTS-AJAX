window.onload = function(){

    function loadJSON(url, name){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                sessionStorage.setItem(name, xhr.response);
            }
        }
        xhr.open('GET', url, true);
        xhr.send(null);
    }

    //Lanzamos petición get y obtenemos el JSON de paises con sus zonas
    loadJSON('https://raw.githubusercontent.com/substack/provinces/master/provinces.json','zonas');
    loadJSON('https://raw.githubusercontent.com/mledoze/countries/master/countries.json','paises');

    var jsonPaises = JSON.parse(sessionStorage.getItem('paises'))

    //Obtenemos el nombre del país a partir de su iso
    function obtenerNombrePais(iso){
        for(pais in jsonPaises){
            if(jsonPaises[pais].cca2 == iso){
                return jsonPaises[pais].name.common;
            }
        }
    }


    var zonas = sessionStorage.getItem('zonas') != null ? JSON.parse(sessionStorage.getItem('zonas')) : {};

    var paises = {}

    zonas.forEach(zona => {
        //Si no existe el pais
        if(paises[zona.country] == undefined){
            paises[zona.country] = {
                zonas: [zona.name]
            }
        } else {
            //Aseguramos que no se repiten zonas
            if(!paises[zona.country].zonas.includes(zona.name)){
                paises[zona.country].zonas.push(zona.name);
            }

        }

    })

    var selectPaises = document.getElementById('selectPaises');
    var selectzonas = document.getElementById('selectRegion');

    //Rellenamos el select con los paises
    Object.keys(paises).forEach(pais => {
        let option = document.createElement('option');
        option.value = pais;
        let nombrePais = obtenerNombrePais(pais);
        let texto = document.createTextNode(nombrePais);
        option.append(texto);

        selectPaises.appendChild(option);
    })

    //Event listener que detecta el cambio de opción.
    selectPaises.addEventListener('change', function(option){
        let opcionSeleccionada = option.srcElement.value;
        limpiarOptions(selectzonas);
        //Obtenemos todas las zonas del pais y las añadimos al select de zonas
        let indexzona = 0;
        if(opcionSeleccionada != "-"){
            paises[opcionSeleccionada].zonas.forEach(zona => {
                let option = document.createElement('option')
                option.value = indexzona;
                let texto = document.createTextNode(zona)
                option.append(texto)
                selectzonas.appendChild(option);
            });
        }

        if(selectzonas.hasChildNodes()){
            selectzonas.disabled = false;
        } else {
            selectzonas.disabled = true;
        }

    })

    function limpiarOptions(select){
        while(select.hasChildNodes()){
            select.removeChild(select.lastElementChild);
        }
    }
}