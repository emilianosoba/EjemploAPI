document.addEventListener("DOMContentLoaded", function() {

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=251&offset=0';

    fetch(url)
        .then(response => response.json())
        .then(data => {

            const arrayPokemons = data.results;
            const dataContainer = document.getElementById('poke-containerV2');

            // Mantener un seguimiento del orden original de los Pokémon
            const pokemonOrder = arrayPokemons.slice(151).map(item => item.url);

            let contador = 1;

            // Crear un array para almacenar las promesas de las solicitudes fetch
            const fetchPromises = [];

            arrayPokemons.slice(151).forEach(item => {
                let pokemonUrl = item.url;

                fetchPromises.push(
                    fetch(pokemonUrl)
                        .then(response => response.json())
                        .then(pokemonData => {
                            const nombrePokemon = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);

                            const div2 = document.createElement('div');
                            div2.classList.add('data-item');

                            div2.innerHTML = `
                                <h3>${contador}. ${nombrePokemon}
                                <img class="img" src="${pokemonData.sprites.front_default}"></h3> `;

                            contador++;

                            return { element: div2, order: pokemonOrder.indexOf(pokemonUrl) };
                        })
                        .catch(error => {
                            console.error('Error al obtener datos del Pokémon:', error);
                        })
                );
            });

            // Esperar a que todas las promesas se resuelvan y ordenar los elementos antes de agregarlos al contenedor
            Promise.all(fetchPromises)
                .then(pokemonElements => {
                    // Ordenar los elementos en función del orden original de los Pokémon
                    pokemonElements.sort((a, b) => a.order - b.order);

                    // Agregar los elementos ordenados al contenedor
                    pokemonElements.forEach(pokemonElement => {
                        dataContainer.appendChild(pokemonElement.element);
                    });
                })
                .catch(error => {
                    console.error('Error al obtener datos de los Pokémon:', error);
                });
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
});

