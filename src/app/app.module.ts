import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LimpiezaComponent } from './components/limpieza/limpieza.component';
import { PlantacionComponent } from './components/plantacion/plantacion.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormPlantacionComponent } from './components/form-plantacion/form-plantacion.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    LimpiezaComponent,
    PlantacionComponent,
    ActividadComponent,
    HomeComponent,
    NavbarComponent,
    FormPlantacionComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,// Aqui estan todas las rutas
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
