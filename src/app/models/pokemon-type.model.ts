import { NamedResource, PokeApiListResponse } from './shared.model';

export type PokemonTypeItem = NamedResource;
export type PokemonTypeListResponse = PokeApiListResponse<PokemonTypeItem>;

export interface PokemonTypeSlotEntry {
    pokemon: NamedResource;
    slot: number;
}

export interface PokemonByTypeResponse {
    name: string;
    pokemon: PokemonTypeSlotEntry[];
}