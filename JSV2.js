document.addEventListener("DOMContentLoaded", function() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=251&offset=0';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const arrayPokemons = data.results;

            const dataContainer = document.getElementById('poke-containerV2');
            let contador = 1;

            for (let i = 100; i < arrayPokemons.length; i++) {
                const item = arrayPokemons[i];
                const div2 = document.createElement('div');
                div2.classList.add('data-item');

                const nombrePokemon = item.name.charAt(0).toUpperCase() + item.name.slice(1);

                div2.innerHTML = `
                    <h3>${contador}. ${nombrePokemon}</h3>`;

                contador++;

                dataContainer.appendChild(div2);
            }
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
});

