import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-limpieza',
  standalone: false,
  templateUrl: './limpieza.component.html',
  styleUrl: './limpieza.component.css'
})
export class LimpiezaComponent implements OnInit{
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
