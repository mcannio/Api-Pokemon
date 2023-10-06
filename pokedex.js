const pokedex = document.getElementById('pokedex');
// fetch('https://pokeapi.co/api/v2/pokemon/')
//   .then((response) => {
//     return response.json();
//   })
//   .then((myJson) => {
//     console.log(myJson);		
//   });

const getPokemon = async () => {
    let myArrayPokemon = [];
    for (let index = 1; index <= 151; index++) {    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);    
    const res = await response.json();
    // console.log(res);
    myArrayPokemon.push(res);
    }
    // console.log(myArrayPokemon)
    const pokemon = myArrayPokemon.map((result) => ({
        name: result.name,
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id
    }));
    // console.log(pokemon)
    return pokemon;
}
const listaPokemon = async () => {
    const pokemonList = await getPokemon()
    console.log(pokemonList);
    const ol = document.getElementById('pokedex');
    for (const pokemon of pokemonList) {
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
        img.setAttribute("style", "width:200px;height:200px;"); 
        const h1 = document.createElement("h1")
        h1.innerText = pokemon.name;
        const p = document.createElement("p")
        p.innerText = pokemon.type;
        div4.appendChild(h1);
        div4.appendChild(p);
        



        div3.appendChild(img); 
        div2.appendChild(div3);
        div2.appendChild(div4);
        div.appendChild(div2);
        li.appendChild(div);        
        ol.appendChild(li);
    }
}
listaPokemon()

// const init = async () => {

// init();
