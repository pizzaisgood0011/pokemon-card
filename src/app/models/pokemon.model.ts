import { NamedResource } from "./shared.model";

export interface PokemonTypeSlot {
    slot: number;
    type: NamedResource;
}

export interface PokemonStatSlot {
    base_stat: number;
    effort: number;
    stat: NamedResource;
}

export interface PokemonAbilitySlot {
    ability: NamedResource;
    is_hidden: boolean;
    slot: number;
}

export interface PokemonOfficialArtwork {
    front_default: string;
}

export interface PokemonSpriteOther {
    'official-artwork': PokemonOfficialArtwork;
}

export interface PokemonSprites {
    front_default: string;
    other: PokemonSpriteOther;
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    sprites: PokemonSprites;
    types: PokemonTypeSlot[];
    stats: PokemonStatSlot[];
    abilities: PokemonAbilitySlot[];
}