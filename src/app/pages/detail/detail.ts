import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokemonService = inject(PokemonService);

  pokemon = signal<Pokemon | null>(null);
  isLoading = signal(true);

  readonly typeColors: Record<string, string> = {
    fire: '#FF4422', water: '#3399FF', grass: '#77CC55',
    electric: '#FFCC33', psychic: '#FF5599', ice: '#66CCFF',
    dragon: '#7766EE', dark: '#775544', fairy: '#EE99EE',
    fighting: '#BB5544', poison: '#AA5599', ground: '#DDBB55',
    rock: '#BBAA66', bug: '#AABB22', ghost: '#6655BB',
    steel: '#AAAABB', flying: '#8899FF', normal: '#AAAA99',
  };

  primaryType = computed(() =>
    this.pokemon()?.types[0]?.type.name ?? 'normal'
  );

  glowColor = computed(() =>
    this.typeColors[this.primaryType()] ?? '#AAAA99'
  );

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonService.getPokemonById(+id).subscribe({
      next: (data) => {
        this.pokemon.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
