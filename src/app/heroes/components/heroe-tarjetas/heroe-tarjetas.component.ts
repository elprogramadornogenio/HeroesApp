import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjetas',
  templateUrl: './heroe-tarjetas.component.html',
  styleUrls: ['./heroe-tarjetas.component.css']
})
export class HeroeTarjetasComponent implements OnInit {

  @Input() heroe!: Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}
