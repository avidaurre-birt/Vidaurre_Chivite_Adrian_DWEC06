//Va a ir toda la configuracion de rutas de la aplicacion

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { PlantacionComponent } from "./components/plantacion/plantacion.component";
import { ActividadComponent } from "./components/actividad/actividad.component";
import { LimpiezaComponent } from "./components/limpieza/limpieza.component";
import { FormPlantacionComponent } from "./components/form-plantacion/form-plantacion.component";


const appRoutes: Routes =[
    {path:'', component: HomeComponent },
    {path: 'plantaciones', component: PlantacionComponent},
    {path: 'plantaciones/nueva', component: FormPlantacionComponent},
    {path: 'plantaciones/:id', component: PlantacionComponent},
    {path:'limpiezas', component: LimpiezaComponent},
    {path:'limpiezas/:id', component: LimpiezaComponent},
    {path: 'actividades', component:ActividadComponent},
    {path: 'actividades/:id', component:ActividadComponent},
    {path:'**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)], //Carga las rutas principales de la aplicación 
    exports: [RouterModule]
})
export class AppRoutingModule{}


/*export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);*/