import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})

export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService : HeroesService,
              private route : ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if( id !== 'nuevo' ){
      this.heroesService.getHeroeById(id)
        .subscribe( (resp: HeroeModel) =>{
          console.log(resp);
          this.heroe = resp;
          this.heroe.id = id;
        });
    }
  }

  guardar( form: NgForm){

    if( form.invalid ){
      console.log('Formulario no valido');
      return;
    }  

    // Swal.fire({
    //   title: 'Espere',
    //   text: 'Guardando informacion',
    //   icon:'info',
    //   allowOutsideClick: false
    // });
    // Swal.showLoading()

    Swal.fire({
      type:'info',
      title: 'Espere',
      text: 'Guardando informacion',
      titleText: 'Espere for favor',
       
      //icon:'info',     
      confirmButtonText: 'Cool',
      allowOutsideClick: false
    });
    Swal.showLoading()


    let peticion: Observable<any>;

    //Si tengo un ID creado para un heroe solo se puede actualizar
    if(this.heroe.id){
      peticion = this.heroesService.actualizarHeroe(this.heroe);

      //Sino se puede crear
    } else{
     peticion= this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp => {
      Swal.fire({
        type:'success',     
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',

      });

    });


    }

}

