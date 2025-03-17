import { Request, Response } from 'express';
const axios = require('axios');

interface PokemonData {
    name: string;
    id: number;
    types: string[];
    weight: number;
    height: number;
    image: string;
}


exports.getPokemon = async (req: Request, res: Response) => {
    const { query } = req.params;

    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
        const pokemonData: PokemonData = {
            name: data.name,
            id: data.id,
            types: data.types.map((type: any) => type.type.name),
            weight: data.weight,
            height: data.height,
            image: data.sprites.front_default,
        }
        res.json(pokemonData);
    } catch (error: any) {
        res.status(error.response.status || 500).json({
            error: error.response.data || "Error al obtener el Pokémon",
        });
    }
}


exports.getPokemons = async (req: Request, res: Response) => {
    const { limit = 10, offset = 0 } = req.query;
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);

        res.json({
            count: data.count,
            next: data.next,
            previous: data.previous,
            results: data.results,
        });
    } catch (error: any) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Error al obtener los Pokémon",
        });
    }
};