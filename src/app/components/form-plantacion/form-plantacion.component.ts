import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Plantacion } from '../../models/Plantacion';
import { Arbol } from '../../models/Arbol';
import { PlantacionService } from '../../service/plantaciones.service';
import { MessageService } from '../../service/message.service';


@Component({
  selector: 'app-form-plantacion',
  standalone: false,
  templateUrl: './form-plantacion.component.html',
  styleUrl: './form-plantacion.component.css'
})
export class FormPlantacionComponent {
  @ViewChild('nuevaPlantacionForm') form!: NgForm;

  public nuevaPlantacion : Plantacion;
  public nuevoArbol : Arbol;
  public enviando: boolean = false; // Control de estado de envío


  constructor( 
    private _plantacionServicio : PlantacionService,
    private _messageService : MessageService,
    private _router:Router,
  )
  { 
    this.nuevaPlantacion = new Plantacion("","", 0, "");
    this.nuevoArbol = new Arbol("", 0);
  }

  createPlantacion(nuevaPlantacion: Plantacion): void {
    
    if (this.enviando) return; // Evitar múltiples envíos
    
    this.enviando = true;
    
    this._plantacionServicio.createPlantacion(nuevaPlantacion).subscribe({
      next: (data) => {
        this._messageService.success('Plantación creada exitosamente', [
          {
            label: 'Ir al listado',
            action: () => this._router.navigate(['/plantaciones']),
            style: 'primary'
          },
          {
            label: 'Crear otra',
            action: () => this.reset(),
            style: 'secondary'
          }
        ]);
        this.reset(); // Limpiar formulario
        console.log("ok", this.nuevaPlantacion)
      },
      error: (err) => {
        this._messageService.error(`Error creando plantación: ${err.message}`, [
          {
            label: 'Reintentar',
            action: () => this.createPlantacion(nuevaPlantacion),
            style: 'secondary'
          }
        ]);
      },
      complete: () => this.enviando = false
    });
  }

  agregarArbol() {
    if (this.nuevoArbol.especie && this.nuevoArbol.cantidad > 0) {
      this.nuevaPlantacion.trees.push(this.nuevoArbol);
      this.nuevoArbol = new Arbol("", 0); // reiniciar campos
    }
  }

  private reset() {
    this.form.resetForm();
    this.nuevaPlantacion = new Plantacion("", "", 0, "");
    this.nuevoArbol = new Arbol("", 0);
  }

  get formValido(): boolean {
    return !!this.nuevaPlantacion.ubicacion && 
           !!this.nuevaPlantacion.fecha && 
           this.nuevaPlantacion.participantes > 0;
  }
}
