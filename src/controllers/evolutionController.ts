import axios from 'axios';
import { POKEAPI_BASE_URL } from '../config/config';

export const getEvolutionData = async (id: number) => {
    try {
        const { data } = await axios.get(`${POKEAPI_BASE_URL}/evolution-chain/${id}`);
        return data;
    } catch (error: any) {
        return error.response.data;
    }
}