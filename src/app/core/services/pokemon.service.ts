import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Pokemon } from "../../models/pokemon.model";
import { PokemonListResponse, } from "../../models/pokemon-list.model";
import { PokemonByTypeResponse, PokemonTypeListResponse } from "../../models/pokemon-type.model";

@Injectable({ providedIn: 'root' })
export class PokemonService {
    private http = inject(HttpClient);
    private baseUrl = 'https://pokeapi.co/api/v2';

    getPokemons(limit: number = 20, offet: number = 0) {
        return this.http.get<PokemonListResponse>(
            `${this.baseUrl}/pokemon?limit=${limit}/&offset=${offet}`
        );
    }

    getPokemonByName(name: string) {
        return this.http.get<Pokemon>(`
            ${this.baseUrl}/pokemon/${name}`
        );
    }

    getPokemonById(id: number) {
        return this.http.get<Pokemon>(`
            ${this.baseUrl}/pokemon/${id}`
        );
    }

    getTypes() {
        return this.http.get<PokemonTypeListResponse>(
            `${this.baseUrl}/type`
        );
    }

    getPokemonByType(type: string) {
        return this.http.get<PokemonByTypeResponse>(
            `${this.baseUrl}/type/${type}`
        );
    }
}