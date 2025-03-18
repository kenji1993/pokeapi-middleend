export interface IPokemonData {
    name: string;
    id: number;
    types: string[];
    weight: number;
    height: number;
    image: string;
}

export interface IPokemonsList {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
}