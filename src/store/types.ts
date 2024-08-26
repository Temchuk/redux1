export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonDetails {
    abilities: Ability[];
    stats: Stat[];
    types: Type[];
    sprites: {
        front_default: string;
    };
    name: string;
}

interface Ability {
    ability: {
        name: string;
    };
}

interface Stat {
    base_stat: number;
    stat: {
        name: string;
    };
}

interface Type {
    type: {
        name: string;
    };
}

interface Form {
    name: string;
    url: string;
}




// src/store/types.ts

export interface PokemonDetails {
    name: string;
    sprites: {
        front_default: string;
    };
    abilities: {
        ability: {
            name: string;
        };
    }[];
    stats: {
        stat: {
            name: string;
        };
        base_stat: number;
    }[];
    forms?: {
        name: string;
    }[];
    species: {
        name: string;
        url: string;
    };
}
