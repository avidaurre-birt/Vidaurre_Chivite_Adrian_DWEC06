// home.component.ts
import { Component, OnInit } from '@angular/core';
import { PlantacionService } from '../../service/plantaciones.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalArboles: number = 0;
  totalPlantaciones: number = 0;
  loading: boolean = true;

  constructor(private plantacionService: PlantacionService) {}

  ngOnInit() {
    this.loadStatistics();
  }

  private loadStatistics() {
    this.plantacionService.getPlantaciones().pipe(
      tap(() => this.loading = true),
      map(plantaciones => {
        // Calcular totales
        const totalPlantaciones = plantaciones.length;
        const totalArboles = plantaciones.reduce((acc, plantacion) => {
          return acc + plantacion.trees.reduce((sum, arbol) => sum + arbol.cantidad, 0);
        }, 0);
        
        return { totalPlantaciones, totalArboles };
      })
    ).subscribe({
      next: ({ totalPlantaciones, totalArboles }) => {
        this.animateValue(this.totalPlantaciones, totalPlantaciones, 2000, 'plantaciones');
        this.animateValue(this.totalArboles, totalArboles, 2000, 'arboles');
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando estadísticas:', error);
        this.loading = false;
      }
    });
  }

  private animateValue(start: number, end: number, duration: number, type: 'arboles' | 'plantaciones') {
    const range = end - start;
    const startTime = Date.now();
    
    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      
      const currentValue = Math.floor(start + (range * Math.min(progress, 1)));
      
      if (type === 'arboles') {
        this.totalArboles = currentValue;
      } else {
        this.totalPlantaciones = currentValue;
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }
}