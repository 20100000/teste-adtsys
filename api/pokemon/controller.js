import fetch from 'node-fetch';

const getTypePk = (temp) =>{
    let type = null;
    if (temp< 5) {
        type = 'ice';
    } else if (temp>= 5 && temp< 10) {
        type = 'water';
    } else if (temp>= 12 && temp< 15) {
        type = 'glass';
    } else if (temp>= 15 && temp< 21) {
        type = 'ground';
    } else if (temp>= 23 && temp< 27) {
        type = 'bug';
    } else if (temp>= 27 && temp<= 33) {
        type = 'rock';
    } else if (temp> 33) {
        type = 'fire';
    } else {
        type = 'normal'
    }
    return type;
}

const getPokemon = async (type) => {
    const url = `https://pokeapi.co/api/v2/type/${type}`;
    const responsePokemon = await fetch(url);
    const resPokemon = await responsePokemon.json();
    const pokemon = resPokemon.pokemon[Math.floor(Math.random() * resPokemon.pokemon.length)].pokemon;
    return pokemon;
}

const getImagePokemon = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
    const responsePokemonImg = await fetch(url);
    const resPokemonImg = await responsePokemonImg.json();
    const pokemonImg = resPokemonImg.sprites.front_default
    return pokemonImg;
}

const _getPokemon = async (req, res, next) => {
    let temp;
    const city = req.params.city;
    const keyApi = process.env.PASSWORD_WEATHER;
    let typePokemon = null;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyApi}&units=metric`;

    try {
        const response = await fetch(url);
        const body = await response.json();
        const rain = body.weather[0].main;
        temp = body.main.temp;

        if (rain === 'Rain' || rain === 'Thunderstorm') {
            typePokemon = 'electric';
        } else {
            typePokemon =  getTypePk(temp);
        }

        const pokemon = await getPokemon(typePokemon);

        const pokemonImg = await getImagePokemon(pokemon);

        return res.send(JSON.stringify({success: true, pokemon: pokemon, rain: rain, temp: temp, img: pokemonImg}));
    } catch (err) {
         res.status(400);
         return res.send(JSON.stringify({success: false, error: err}));
    }
};

const getController = () => ({
    getPokemon: (req, res, next) => _getPokemon(req, res, next),
});

module.exports.getController = getController;