import { Request, Response } from 'express';
import { fetchPokemon, fetchPokemonsList } from '../services/pokemonService';
import { getEvolutionData } from './evolutionController';


exports.getPokemon = async (req: Request, res: Response) => {
    const { query } = req.params;

    try {
        const pokemonData = await fetchPokemon(query);
        const evolutionData = await getEvolutionData(pokemonData.id);

        res.json({
            ...pokemonData
        });
    } catch (error: any) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Error al obtener el Pokémon",
        });
    }
}


exports.getPokemonsList = async (req: Request, res: Response) => {
    const { limit = 10, offset = 0 } = req.query;
    try {
        const pokemonsList = await fetchPokemonsList(Number(limit), Number(offset));

        res.json({pokemonsList});
    } catch (error: any) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Error al obtener los Pokémon",
        });
    }
};