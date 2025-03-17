const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/pokemon/:query', async (req, res) => {
    const { query } = req.params;

    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
        
        res.json({
            name: data.name,
            id: data.id,
            types: data.types.map((type) => type.type.name),
            weight: data.weight,
            height: data.height,
            image: data.sprites.front_default,
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Error al obtener el Pokémon",
        });
    }
});

app.get('/pokemons', async (req, res) => {
    const { limit = 10, offset = 0 } = req.query;
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${limit}&limit=${offset}`);

        res.json({
            count: data.count,
            next: data.next,
            previous: data.previous,
            results: data.results,
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Error al obtener la lista de Pokémon",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
