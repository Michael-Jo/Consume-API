let castsTemplate = Handlebars.compile(document.getElementById("castCard").innerHTML);

// let offset = 0;
let offset = "people";
const limit = 20;

async function fetchStarWars() {
    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit${limit}`);
    const response = await fetch(`https://swapi.dev/api/${offset}/${limit}/`);
    const data = await response.json();
    offset += limit;
    starWarsArr = [];
    data.results.forEach(element => {
        const url = element.url
        const segments = url.split('/');
        const id = segments[segments.length - 2];
        pokemonArr.push(
            {
                id : id,
                name : element.name,
                url : element.url,
                // ImageUrl : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            }
        )
    });
    return { starWars : starWarsArr}

    function renderStarWars(starWarsList) {
        const container = document.getElementById(`content`);
        const html = starWarsTemplate(starWarsList);
        container.insertAdjacentElement('beforeend', html);
    }


    async function initialLoad(){
        const starWarsnList = await fetchStarWars();
        renderStarWars(starWarsList);
    }


    document.querySelector("button").addEventListener('click', async () => {
        initialLoad();
    })

    
    window.addEventListener('scroll', async () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            initialLoad();
        }
    });
    initialLoad();
    document.getElementById('yearText').innerHTML = new Date().getFullYear();
}