const fetch = require('node-fetch');

const _getPokemon = async (req, res, next) => {
    let temp;
    const city = req.params.city;
    const keyApi = process.env.PASSWORD_WEATHER;
    let typePokemon = '';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyApi}&units=metric`;

    try {
        const response = await fetch(url);
        const body = await response.json();
        let rain = body.weather[0].main;
        temp = body.main.temp;

        if (body.main.temp < 5) {
            typePokemon = 'ice';
        } else if (body.main.temp >= 5 && body.main.temp < 10) {
            typePokemon = 'water';
        } else if (body.main.temp >= 12 && body.main.temp < 15) {
            typePokemon = 'glass';
        } else if (body.main.temp >= 15 && body.main.temp < 21) {
            typePokemon = 'ground';
        } else if (body.main.temp >= 23 && body.main.temp < 27) {
            typePokemon = 'bug';
        } else if (body.main.temp == 33) {
            typePokemon = 'rock';
        } else if (body.main.temp > 33) {
            typePokemon = 'fire';
        } else {
            typePokemon = 'normal'
        }
        //
        if (rain === 'Rain' || rain === 'Thunderstorm') {
            typePokemon = 'electric';
        }

        url = `https://pokeapi.co/api/v2/type/${typePokemon}`;
        const responsePokemon = await fetch(url);
        const resPokemon = await responsePokemon.json();
        const pokemon = resPokemon.pokemon[Math.floor(Math.random() * resPokemon.pokemon.length)].pokemon;
        //pokemon.sprites.front_default

        url = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
        const responsePokemonImg = await fetch(url);
        const resPokemonImg = await responsePokemonImg.json();
        const pokemonImg = resPokemonImg.sprites.front_default

        return res.send(JSON.stringify({success: true, pokemon: pokemon, rain: rain, temp: temp, img: pokemonImg}));
    } catch (err) {
         return res.send(JSON.stringify({success: false, error: err}));
        next(err);
    }
};

const getController = () => ({
    getPokemon: (req, res, next) => _getPokemon(req, res, next),
});

module.exports.getController = getController;