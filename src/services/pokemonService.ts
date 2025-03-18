import axios from 'axios';
import { POKEAPI_BASE_URL } from '../config/config';
import { IPokemonData, IPokemonsList } from '../types/Pokemon';

export const fetchPokemon = async (query: string) => {
    try {
        const { data } = await axios.get(`${POKEAPI_BASE_URL}/pokemon/${query}`);
        const { name, id, types, weight, height, sprites } = data;

        const pokemonData: IPokemonData = {
            name: name,
            id: id,
            types: types.map((type: any) => type.type.name),
            weight: weight,
            height: height,
            image: sprites.front_default,
        }

        return pokemonData;
    } catch (error: any) {
        throw {
            status: error.response.status || 500,
            message: error.response.data || "Error al obtener el Pokémon",
        }
    }
}

export const fetchPokemonsList = async (limit: number, offset: number) => {
    try {
        const { data } = await axios.get(`${POKEAPI_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
        const { count, next, previous, results } = data;

        const pokemonsList: IPokemonsList = {
            count: count,
            next: next,
            previous: previous,
            results: results,
        }

        return pokemonsList;
    } catch (error: any) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data || "Error al obtener los Pokémon",
        }
    }
}