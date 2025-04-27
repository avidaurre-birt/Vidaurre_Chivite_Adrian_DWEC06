import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PlantacionService} from '../../service/plantaciones.service';
import { MessageService } from '../../service/message.service';

import { Arbol } from '../../models/Arbol';
import { Plantacion } from '../../models/Plantacion';

@Component({
  selector: 'app-plantacion',
  standalone: false,
  templateUrl: './plantacion.component.html',
  styleUrls: ['./plantacion.component.css']
})
export class PlantacionComponent implements OnInit {
  id: string | null = null;
  plantacion?: Plantacion;
  plantaciones: Plantacion[] = [];
  public nuevaPlantacion : Plantacion;
  public nuevoArbol : Arbol;
  public mensaje: string = ''; // Para feedback al usuario
  public enviando: boolean = false; // Control de estado de envío
  editMode: boolean = false;
  plantacionOriginal!: Plantacion; // Para guardar la versión original
  
  //@ViewChild('nuevaPlantacionForm') form!: NgForm;

  constructor( 
    private _plantacionServicio : PlantacionService,
    private _messageService : MessageService,
    private _route:ActivatedRoute,
    private _router:Router,
  )
  { 
    this.nuevaPlantacion = new Plantacion("","", 0, "");
    this.nuevoArbol = new Arbol("", 0);
  }

  ngOnInit(): void {

    this._route.params.subscribe((params: Params) => {
    console.log("Parametros recibidos: ", params);
    this.id = params["id"];
    
    if (this.id) {
      this.getPlantacionById(this.id);
    } 
    // 3. Si no hay ID, cargamos TODAS
    else {
      this.getPlantaciones();
    }
});
  }
  getPlantaciones():void {
      this._plantacionServicio.getPlantaciones().subscribe({
      next: (data) =>{ this.plantaciones = data;
        console.log(data);},
      error: (err) => console.error('Error cargando plantación:', err)      
      });
    }

  getPlantacionById(id: string): void {
      this._plantacionServicio.getPlantacionById(id).subscribe({
      next: (data) => this.plantacion = data,
      error: (err) => console.error('Error cargando plantación:', err)
      });
  }

  /*createPlantacion(nuevaPlantacion: Plantacion): void {
      this._plantacionServicio.createPlantacion(nuevaPlantacion).subscribe({
        next: (data) => {
          this.nuevaPlantacion = data;
          console.log(this.nuevaPlantacion)
        },
        error: (err) => {
          console.error("Error creando la nueva plantacion", err)
          console.log(this.nuevaPlantacion)
        }
      });
  }*/

  agregarArbol() {
    if (this.nuevoArbol.especie && this.nuevoArbol.cantidad > 0) {
      this.nuevaPlantacion.trees.push(
        this.nuevoArbol);
      
      // Resetear valores, no la instancia
      this.nuevoArbol.especie = '';
      this.nuevoArbol.cantidad = 0;
    
    }
  }

  updatePlantacion(): void{
    this._plantacionServicio.updatePlantacion(this.id!, this.plantacion!).subscribe({
      next: (data) => {
        this.nuevaPlantacion = data;
        this.editMode = false;
        console.log(this.nuevaPlantacion)
        this._messageService.success('Plantación actualizada correctamente', [
          {
            label: 'Ver detalles',
            action: () => this._router.navigate(['/plantaciones', this.id]),
            style: 'primary'
          },
          {
            label: 'Volver al listado',
            action: () => this._router.navigate(['/plantaciones']),
            style: 'secondary'
          }
        ]);
      },
      error: (err) => {
        this._messageService.error(`Error actualizando plantación: ${err.message}`, [
          {
            label: 'Volver al listado',
            action: () => this._router.navigate(['/plantaciones']),
            style: 'primary'
          },
          {
            label: 'Reintentar',
            action: () => this.updatePlantacion(),
            style: 'secondary'
          }
        ]);
      }
    })
  }

  deletaPlantacion(id:string): void{
    //if(confirm('¿Estás seguro de eliminar esta plantación?')) {
      this._plantacionServicio.deletePlantacion(id).subscribe({
        next: () => {
          this._messageService.success('Plantación eliminada correctamente', [
            {
              label: 'Volver al listado',
              action: () => this._router.navigate(['/plantaciones']),
              style: 'primary'
            }
          ]);
        },
        error: (err) => {
          this._messageService.error(`Error eliminando plantación: ${err.message}`, [
            {
              label: 'Reintentar',
              action: () => this.deletaPlantacion(id),
              style: 'secondary'
            }
          ]);
        }
      });
    //}
  }

  activarEdicion(): void {
    this.editMode = true;
    // Hacer copia de la plantación para editar
    this.plantacionOriginal = new Plantacion(
      this.nuevaPlantacion.ubicacion,
      this.nuevaPlantacion.fecha,
      this.nuevaPlantacion.participantes,
      this.nuevaPlantacion.id,
      [...this.nuevaPlantacion.trees] // Copia profunda del array
    );
  }

  cancelarEdicion(): void {
    this.editMode = false;
    //this.plantacion =this.plantacionOriginal.clone();
  }

  // Nuevos métodos para el modal
  irAListado(): void {
    this._router.navigate(['/plantaciones']);
  }

  
}
