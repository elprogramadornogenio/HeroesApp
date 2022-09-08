import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = "";

  heroes: Heroe[] = [];

  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(
        heroes => this.heroes = heroes
      )
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (this.termino.length != 0) {
      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;

      this.heroesService.getHeroePorId(heroe.id!)
        .subscribe((heroe: Heroe) => this.heroeSeleccionado = heroe);
    } else {
      this.heroeSeleccionado = undefined;
      this.termino = "";
      return;
    }
    
  }

}
