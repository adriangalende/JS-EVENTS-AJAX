window.onload = function () {

    const abecedary = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r"
        ,"s","t","u","v","w","x","y","z"];

    let url = 'https://raw.githubusercontent.com/mledoze/countries/master/countries.json'
    let request = new XMLHttpRequest();
    var paises;
    var outputPaises = document.querySelectorAll('#tablaPaises')[0];
    var select = document.getElementById("selectAbecedario");

    //Cargamos el select con las opciones del abecedario.
    abecedary.forEach(letra => {
        let option = document.createElement('option');
        option.value = letra.toLowerCase();
        let textoOption = document.createTextNode(letra.toLowerCase());
        option.append(textoOption);
        select.appendChild(option);
    })


    //creamos el objeto tabla
    var table = document.createElement('table');
    outputPaises.append(table);

    //Función para rellenar fila
    function rellenarTabla(paisesSeleccionados){
        paisesSeleccionados.forEach(pais => {
            let tr = document.createElement('tr');
            let td = document.createElement('td')
            td.style ="border: 1px solid #000"
            let tdText = document.createTextNode(pais)
            td.append(tdText);
            tr.appendChild(td);
            table.appendChild(tr);
        })

    }

    //función que limpia los childnodes de la tabla{
    function limpiarTrTabla(){
        while(table.hasChildNodes()){
            table.removeChild(table.lastChild)
        }
    }

    //Lanzamos petición get y obtenemos el JSON de paises
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            sessionStorage.setItem("paises", xhr.response);
        }
    }
    xhr.open('GET', url, true);
    xhr.send(null);

    paises = JSON.parse(sessionStorage.getItem('paises'));

    select.addEventListener('change', function(letra){
        limpiarTrTabla();
        let paisesSeleccionado = [];
        paises.forEach(pais => {
            if(pais.name.common.toLowerCase().indexOf(letra.srcElement.value) == 0){
                paisesSeleccionado.push(pais.name.common);
            }
        });

        rellenarTabla(paisesSeleccionado);
    })





}