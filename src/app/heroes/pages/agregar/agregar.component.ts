import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publisher, Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  Publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }

  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  mostrarSnakbar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0) {
      return;
    } 

    if(this.heroe.id) {
      //Editar
      this.heroesService.actualizarHeroe(this.heroe).subscribe(heroe => {
        this.mostrarSnakbar('Registro actualizado');
      });
    } else {
      //Guardar
      this.heroesService.agregarHeroe(this.heroe).subscribe(heroe => {
        this.mostrarSnakbar('Registro creado');
        this.router.navigate(['/heroes/editar', heroe.id]);
      });
    }

  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: {...this.heroe}
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if( result ) {
          if(!this.heroe.id) {
            return;
          }
          this.heroesService.borrarHeroe(this.heroe.id).subscribe(resp => {
            this.mostrarSnakbar('Registro eliminado');
            this.router.navigate(['/heroes/listado']);
          })
        }
      }
    )

    /* if(!this.heroe.id) {
      return;
    }
    this.heroesService.borrarHeroe(this.heroe.id).subscribe(resp => {
      this.mostrarSnakbar('Registro eliminado');
      this.router.navigate(['/heroes/listado']);
    }) */
  }

  constructor(
    private heroesService: HeroesService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.heroesService.getHeroePorId(id))
    ).subscribe((heroe: Heroe) => this.heroe = heroe);

    
  }

}
