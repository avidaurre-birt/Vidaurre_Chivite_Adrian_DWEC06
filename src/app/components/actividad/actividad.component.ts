import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-actividad',
  standalone: false,
  templateUrl: './actividad.component.html',
  styleUrl: './actividad.component.css'
})
export class ActividadComponent implements OnInit{

  public id: string='';

  constructor(
    private _route:ActivatedRoute, 
    private _router:Router)
    {}

   ngOnInit(): void {

    this._route.params.subscribe((params: Params) => {
    console.log("Parametros recibidos: ", params);
    this.id = params["id"];
    });
  }
}
