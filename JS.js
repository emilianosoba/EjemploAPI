document.addEventListener("DOMContentLoaded", function() {

const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'


fetch(url)
    .then(response => response.json())
    .then(data => {

        const arrayPokemons = data.results;
        const dataContainer = document.getElementById('poke-container')
        let contador = 1;

        arrayPokemons.forEach(item =>  {

            const div = document.createElement('div');
            div.classList.add('data-item');

            const nombrePokemon = item.name.charAt(0).toUpperCase() + item.name.slice(1);


            div.innerHTML = `
                <h3>${contador}. ${nombrePokemon}</h3>`;
                
                

            contador++;

        dataContainer.appendChild(div);
        });
    })

    .catch(error => {
        console.error('Error al obtener datos:', error);
    });

})

    

 