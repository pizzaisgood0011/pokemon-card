import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonListItem } from '../../models/pokemon-list.model';
import { PokemonTypeItem } from '../../models/pokemon-type.model';

@Component({
  selector: 'app-home',
  imports: [PokemonCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private pokemonService = inject(PokemonService);

  // raw data
  allPokemon = signal<PokemonListItem[]>([]);
  types = signal<PokemonTypeItem[]>([]);

  // filters
  searchQuery = signal('');
  selectedType = signal('');

  // loading states
  isLoadingPokemon = signal(true);
  isLoadingTypes = signal(true);
  isLoadingByType = signal(false);

  // derived list - recomputes when search or type changes
  filteredPokemon = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    return this.allPokemon().filter(p =>
      p.name.toLowerCase().includes(query)
    );
  });

  ngOnInit() {
    this.loadAllPokemon();
    this.loadTypes();
  }

  loadAllPokemon() {
    this.pokemonService.getPokemons(150).subscribe({
      next: (data) => {
        this.allPokemon.set(data.results);
        this.isLoadingPokemon.set(false);
      },
      error: () => this.isLoadingPokemon.set(false)
    });
  }

  loadTypes() {
    this.pokemonService.getTypes().subscribe({
      next: (data) => {
        // filter out weird types like 'unknown' and 'shadow'
        this.types.set(data.results.filter(t =>
          !['unknown', 'shadow'].includes(t.name)
        ));
        this.isLoadingTypes.set(false);
      },
      error: () => this.isLoadingTypes.set(false)
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onTypeSelect(type: string) {
    if (this.selectedType() === type) {
      // clicking same type deselects it
      this.selectedType.set('');
      this.loadAllPokemon();
      return;
    }

    this.selectedType.set(type);
    this.isLoadingByType.set(true);

    this.pokemonService.getPokemonByType(type).subscribe({
      next: (data) => {
        const list = data.pokemon.map(entry => entry.pokemon);
        this.allPokemon.set(list);
        this.isLoadingByType.set(false);
      },
      error: () => this.isLoadingByType.set(false)
    });
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedType.set('');
    this.loadAllPokemon();
  }
}
