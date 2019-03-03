window.onload = function () {

    // let url = 'https://gist.githubusercontent.com/keeguon/2310008/raw/bdc2ce1c1e3f28f9cab5b4393c7549f38361be4e/countries.json'
    let url = 'https://raw.githubusercontent.com/mledoze/countries/master/countries.json'
    let request = new XMLHttpRequest();
    var paises;
    var inputPaises = document.querySelectorAll('#hiddenPaises')[0];


    // function load(url) {
    //     let paises = "";
    //     var xhr = new XMLHttpRequest();
    //
    //     xhr.onreadystatechange = function() {
    //         if (xhr.readyState === 4) {
    //             document.querySelectorAll('#hiddenPaises')[0].textContent = xhr.response
    //         }
    //     }
    //
    //     xhr.open('GET', url, true);
    //     xhr.send('');
    // }
    //
    // load(url)
    $.get(url,function(data){
        var paises = JSON.parse(data);
        var result = "";
        var request = "";
        var matched = []

        console.log(paises)
            document.getElementById('inputPaises').addEventListener('keydown', function(input){
                matched = []
                result = "";
                request = document.getElementById('inputPaises').value
                paises.forEach(pais => {
                    if(pais.name.tranlations != undefined) {
                        pais.name.translations.forEach(translation => {
                            if (translation.common.toUpperCase().includes(request.toUpperCase())) {
                                if (!matched.includes(pais.name.official.toUpperCase())) {
                                    matched.push(pais.name.official.toUpperCase())
                                    result += "- " + translation.common.toUpperCase() + "\n";
                                }
                            }
                        })
                    } else {
                        if (pais.name.official.toUpperCase().includes(request.toUpperCase())) {
                            if (!matched.includes(pais.name.official.toUpperCase())) {
                                matched.push(pais.name.official.toUpperCase())
                                result += "- " + pais.name.official.toUpperCase()+ "\n";
                            }
                        }
                    }
                })
                document.getElementById('resultado').innerHTML = result
            })

    })

}