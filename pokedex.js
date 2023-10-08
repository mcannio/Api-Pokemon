
const pokedex = document.getElementById('pokedex'); // COJO EL OBJETO POKEDEX DE HTML

const getPokemon = async () => { // RECOJO DATOS DE LA API Y LOS ALMACENO EN UN ARRAY
    
    let myArrayPokemon = [];
    for (let index = 1; index <= 151; index++) {  // CREO UN BUCLE PARA RECOGER EN EL ARRAY LOS 151  
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);    
    const res = await response.json();
    
    // console.log(res);
    myArrayPokemon.push(res); // AÑADO ELEMENTOS
    }
    
    // console.log(myArrayPokemon)
    const pokemon = myArrayPokemon.map((result) => ({ // CREO UNA CONSTANTE PARA MAPEAR LOS DATOS DE LA API
        name: result.name,
        image: result.sprites.versions["generation-v"]["black-white"].animated.front_default,
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id,
        ability: result.abilities.map((ability) => ability.ability.name).join(', '),
    }));
   
    myArrayPokemon.push(pokemon);
    // console.log(pokemon)
    return pokemon;
    
}   

const listaPokemon = async (searchTerm ="") => {  //¿?
    const pokemonList = await getPokemon();
    const filteredPokemonList = filtrarPokemon(pokemonList, searchTerm); // BUSCO POR NOMBRE
    // console.log(pokemonList);    
    const ol = document.getElementById('pokedex');

    ol.innerHTML = ''; // INSERTO LA INFO EN HTML

    for (const pokemon of filteredPokemonList) {
        const li = document.createElement('li');         
        const div = document.createElement('div');
        div.setAttribute("class","flip-card");
        const div2 = document.createElement("div");
        div2.setAttribute("class", "flip-card-inner");
        const div3 = document.createElement("div");
        div3.setAttribute("class", "flip-card-front");
        const div4 = document.createElement("div");
        div4.setAttribute("class", "flip-card-back"); 
        const img = document.createElement('img');   
        img.setAttribute("src", pokemon.image);
        img.setAttribute("alt", "Avatar"); 
        img.setAttribute("style", "width:130px;height:130px;align-items: center;"); 
        const h1 = document.createElement("h1");        
        h1.innerText = mayus (pokemon.name);       
        const p = document.createElement("p");
        p.innerText = `Type: ${pokemon.type}`;
        const p1 = document.createElement("p");
        p1.innerText =  `Abilities: ${pokemon.ability}`;
        
        div4.appendChild(h1);
        div4.appendChild(p);     
        div4.appendChild(p1);
        div3.appendChild(img); 
        div2.appendChild(div3);
        div2.appendChild(div4);
        div.appendChild(div2);
        li.appendChild(div);        
        ol.appendChild(li);             
        
    }
    
};
const filtrarPokemon = (pokemonList, searchTerm) => {
    return pokemonList.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
};
function mayus(palabra) { // FUNCIÓN PARA PONER EN MAYÚSCULA LA PRIMERA LETRA DEL NOMBRE
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}
listaPokemon(); // LLAMO A LA FUNCIÓN PRINCIPAL
const searchButton = document.getElementById('searchButton'); //BUSCADOR
const searchInput = document.getElementById('searchInput');
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    listaPokemon(searchTerm);
});

var myVar; // LE PONGO AL INICIO UNA BARRA DE CARGA

function myFunction() { 
  myVar = setTimeout(showPage, 2500);
  
}

function showPage() {
  document.getElementById("ring").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
