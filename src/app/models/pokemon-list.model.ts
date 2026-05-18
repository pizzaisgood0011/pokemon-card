import { NamedResource, PokeApiListResponse } from './shared.model';

export type PokemonListItem = NamedResource;
export type PokemonListResponse = PokeApiListResponse<PokemonListItem>;