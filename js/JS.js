
const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

fetch(url)
    .then(response => response.json())
    .then(data => {

        const arrayPokemons = data.results;
        const dataContainer = document.getElementById('poke-container')

        arrayPokemons.forEach(item => {

            const div = document.createElement('div');
            div.classList.add('data-item');

            div.innerHTML = `
            <p>${item.name}</p>
            `;

        dataContainer.appendChild(div);
    });


 })
 .catch(error => {
    console.error('Error al obtener datos:', error);
});