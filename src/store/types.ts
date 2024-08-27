export interface Pokemon {
    name: string;
    url: string;
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

export interface PokemonDetails {
    name: string;
    sprites: {
        front_default: string;
        front_shiny?: string;
        front_female?: string;
        front_shiny_female?: string;
        back_default?: string;
        back_shiny?: string;
        back_female?: string;
        back_shiny_female?: string;
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
