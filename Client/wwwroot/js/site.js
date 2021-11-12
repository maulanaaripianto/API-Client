// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

/*var halo = document.querySelector('.content-two p#a');
halo.addEventListener("click", function () {
    halo.style.backgroundColor = 'pink';
});

$(".content-two p").click(function () {
    $(".content-two p#b").css('background-color', '#67ED99  ')
})*/


const animals = [
    { name: 'Nemo', species: 'fish', class: { name: 'invertebrata' } },
    { name: 'Simba', species: 'Cat', class: { name: 'Mamalia' } },
    { name: 'Dory', species: 'fish', class: { name: 'invertebrata' } },
    { name: 'Panther', species: 'Cat', class: { name: 'Mamalia' } },
    { name: 'Budi', species: 'Cat', class: { name: 'Mamalia' } }
]

//Kode 1
let animals2 = [];
let onlyCat = [];
for (let i = 0; i < animals.length; i++) {
    animals2.push(animals[i]);
    if (animals2[i].species == "fish" || animals2[i].class.name == "invertebrata") {
        animals2[i].class.name = "Non Mamalia";
    } else if(animals2[i].class.name == "Mamalia"){
        onlyCat.push(animals2[i]);
    }
}
console.log(animals2);
console.log(onlyCat);

//Kode 2

/*for (let i = 0; i < animals2.length; i++) {
    if (animals2[i].species == "fish") {
        onlyCat.push(animals[i]);
    }
}*/

   /*$.ajax({
       url: "https://swapi.dev/api/people/",
       success: function (result) {
           console.log(result);
           var liststarwars = "";
           $.each(result.results, function (key, val) {
               liststarwars += `<tr>
                            <th>${key + 1}</th>
                            <th>${val.name}</th>
                            <th>${val.height}</th>
                            <th>${val.hair_color}</th>
                            <th>${val.skin_color}</th>
                            <th>${val.gender}</th>
                        </tr>`
           });
           $('#starWars').html(liststarwars);
       }
    });*/

$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/",
    success: function (result) {
        console.log(result);
        var listspokemon = "";
        $.each(result.results, function (key, val) {
            listspokemon += `<tr>
                            <th>${key + 1}</th>
                            <th>${val.name}</th>
                            <th><button type="button" class="btn btn-primary" onclick="launchModal('${val.url}')" data-url="${val.url}" data-toggle="modal" data-target="#exampleModal">Detail</button></th>
                        </tr>`
        });
        $('#pokemonAPI').html(listspokemon);
    }
});

/*function launchModal(url) {
    console.log(url);
    listspokemon = "";
    $.ajax({
        url: url,
        success: function (result) {
            listspokemon += `<tr>
                             <th> Nama : ${result.name}<th>

                             </tr>`;
            $('.modal-body').html(listspokemon);
        }
    });
}
*/


function launchModal(url) {
    /*console.log(url);*/
    listSW = "";
    ability1 = "";
    tipe = "";
    no = 0;
    $.ajax({
        url: url,
        success: function (result) {
            result.abilities.forEach(a => {
                ability1 += ` <td><b>${++no}</b>${'.'} ${a.ability.name}</td>`
            })
            result.types.forEach(a => {
                if (a.type.name == 'grass') {
                    tipe += ` <span class="badge badge-success">Grass</span>`
                }
                else if (a.type.name == 'poison') {
                    tipe += ` <span class="badge badge-secondary">Poison</span>`
                }
                else if (a.type.name == 'fire') {
                    tipe += ` <span class="badge badge-danger">Fire</span>`
                }
                else if (a.type.name == 'flying') {
                    tipe += ` <span class="badge badge-primary">Flying</span>`
                }
                else if (a.type.name == 'water') {
                    tipe += ` <span class="badge badge-info">Water</span>`
                }
                else if (a.type.name == 'bug') {
                    tipe += ` <span class="badge badge-success">Bug</span>`
                }
                else if (a.type.name == 'normal') {
                    tipe += ` <span class="badge badge-dark">Normal</span>`
                }
                else {
                    tipe += ` <span class="badge badge-dark">${a.type.name}</span>`
                }
            })

            listSW += `
                    <div class="container-fluid">
                        <div class="row">         
                            <div class="col-md">
                                <div class="list-group-item" id="pokemonName">
                                    <img id="pokemon" src="${result.sprites.other.home.front_default}">
                                    <h4>${result.name}</h4>
                                </div>     
                                <ul class="list-group">
                                <li class="list-group-item"><strong>Types : </strong>${tipe}</li>
                                <li class="list-group-item"><strong>Weight : </strong>${result.weight}</li>
                                <li class="list-group-item"><strong> Height : </strong>${result.height}</li>
                                <li class="list-group-item"><strong>Ability : </strong>${ability1}</li>
                                </ul>
                            </div>
                        </div>
                    </div>`
                ;

            $('.modal-body').html(listSW);
        }
    })
}
/*$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    success: function (result) {
        console.log(result);
        var listspokemon = "";
        $.each(result.abilities, function (key, val) {
            listspokemon += `<tr>
                            <th>${key + 1}</th>
                            <th>${val.ability.name}</th>
                            <th><button type="button" class="btn btn-primary" onclick="launchModal('${val.url}')" data-url="${val.url}" data-toggle="modal" data-target="#exampleModal">Detail</button></th>
                        </tr>`
        });
        $('#pokemonAPI').html(listspokemon);
    }
});*/

/*function launchModal(url) {
    console.log(url);
    listspokemon = "";
    $.ajax({
        url: url,
        success: function (result) {
            listspokemon += `<tr>
                            <th>Nama : ${result.name}</th>
                            <th>URL : ${result.url}</th>
                        </tr>`;
            $('.modal-body').html(listspokemon);
        }
    });
}*/
