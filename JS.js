document.addEventListener("DOMContentLoaded", function() {

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const arrayPokemons = data.results; // array que toma el array results del JSON
            const dataContainer = document.getElementById('poke-container') // container para colocar lo pedido por fetch

            let contador = 1;

            arrayPokemons.forEach(item => { // recorremos el array por item

                const div = document.createElement('div'); //creamos un div
                div.classList.add('data-item'); // le agregamos clase data-item

                
                let pokemonUrl = item.url; // URL del Pokémon individual

                fetch(pokemonUrl) // fetch con el url de cada pokemon para agregar su imagen
                    .then(response => response.json())
                    .then(pokemonData => {
                        const nombrePokemon = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1); // Toma la primer letra del pokemon la hace mayuscula y luego agrega el resto del nombre

                        div.innerHTML = ` 
                            <h3>${contador}. ${nombrePokemon}</h3>
                            <img class="img" src="${pokemonData.sprites.front_default}"> `

                        contador++;

                        dataContainer.appendChild(div); // se agrega el div creado en el forEach al contenedor
                    })
                    .catch(error => {
                        console.error('Error al obtener datos del Pokémon:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });

});

    

 