import { Component, Input, OnInit, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonListItem } from '../../models/pokemon-list.model';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemonItem!: PokemonListItem;

  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  pokemon = signal<Pokemon | null>(null);
  isFlipped = signal(false);
  isLoading = signal(true);

  readonly typeColors: Record<string, string> = {
    fire: '#FF4422',
    water: '#3399FF',
    grass: '#77CC55',
    electric: '#FFCC33',
    psychic: '#FF5599',
    ice: '#66CCFF',
    dragon: '#7766EE',
    dark: '#775544',
    fairy: '#EE99EE',
    fighting: '#BB5544',
    poison: '#AA5599',
    ground: '#DDBB55',
    rock: '#BBAA66',
    bug: '#AABB22',
    ghost: '#6655BB',
    steel: '#AAAABB',
    flying: '#8899FF',
    normal: '#AAAA99',
  };

  ngOnInit() {
    this.pokemonService.getPokemonByName(this.pokemonItem.name).subscribe({
      next: (data) => {
        this.pokemon.set(data);
        this.isLoading.set(false);
      },
      error: ()=> {
        this.isLoading.set(false);
      }
    });
  }

  // computed instead of getter
  primaryType = computed(() =>
    this.pokemon()?.types[0]?.type.name ?? 'normal'
  );

  glowColor = computed(() =>
    this.typeColors[this.primaryType()] ?? '#AAAA99'
  );

  flip() {
    this.isFlipped.update(prev => !prev); // .update() to toggle
  }

  goToDetail() {
    this.router.navigate(['/pokemon', this.pokemon()?.id]);
  }
}
