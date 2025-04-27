import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plantacion } from '../models/Plantacion';
import { Arbol } from '../models/Arbol';

@Injectable({
  providedIn: 'root'
})
export class PlantacionService {
  private baseUrl = 'https://vidaurrechiviteadriandwes05-production.up.railway.app/api';

  constructor(private http: HttpClient) {}

  // ====================== OPERACIONES PARA PLANTACIONES ======================
  
  // GET Todas las plantaciones
  getPlantaciones(): Observable<Plantacion[]> {
    return this.http.get<Plantacion[]>(`${this.baseUrl}/plantaciones`);
  }

  // GET Plantación por ID (con sus árboles)
  getPlantacionById(id: string): Observable<Plantacion> {
    return this.http.get<Plantacion>(`${this.baseUrl}/plantaciones/${id}`);
  }

  // POST Crear nueva plantación
  createPlantacion(plantacion: Plantacion): Observable<Plantacion> {
    return this.http.post<Plantacion>(`${this.baseUrl}/plantaciones/create`, plantacion);
  }

  // PUT Actualizar plantación
  updatePlantacion(id: string, plantacion: Plantacion): Observable<Plantacion> {
    return this.http.put<Plantacion>(`${this.baseUrl}/plantaciones/update/${id}`, plantacion);
  }

  // DELETE Eliminar plantación
  deletePlantacion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/plantaciones/delete/${id}`);
  }

  // ====================== OPERACIONES PARA ÁRBOLES ======================

  // GET Árboles de una plantación
  getArbolesByPlantacionId(plantacionId: string): Observable<Arbol[]> {
    return this.http.get<Arbol[]>(`${this.baseUrl}/plantacions/${plantacionId}/arboles`);
  }

  // POST Añadir árbol a una plantación
  createArbol(plantacionId: string, arbol: Arbol): Observable<Arbol> {
    return this.http.post<Arbol>(`${this.baseUrl}/plantacions/${plantacionId}/arboles`, arbol);
  }

  // PUT Actualizar árbol
  updateArbol(plantacionId: string, arbolId: string, arbol: Arbol): Observable<Arbol> {
    return this.http.put<Arbol>(`${this.baseUrl}/plantacions/${plantacionId}/arboles/${arbolId}`, arbol);
  }

  // DELETE Eliminar árbol
  deleteArbol(plantacionId: string, arbolId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/plantacions/${plantacionId}/arboles/${arbolId}`);
  }
}