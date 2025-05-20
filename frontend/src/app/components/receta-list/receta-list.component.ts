import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecetaService, Receta } from '../../services/receta.service';

@Component({
  selector: 'app-receta-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="row mb-4">
        <div class="col">
          <h2>Recetas</h2>
        </div>
        <div class="col text-end">
          <a routerLink="/recetas/nueva" class="btn btn-primary">Nueva Receta</a>
        </div>
      </div>

      <div *ngIf="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>

      <div *ngIf="!error && recetas.length === 0" class="alert alert-info" role="alert">
        No hay recetas disponibles. ¡Crea una nueva!
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div *ngFor="let receta of recetas" class="col">
          <div class="card h-100">
            <img *ngIf="receta.imagen" [src]="receta.imagen" class="card-img-top" [alt]="receta.titulo">
            <div class="card-body">
              <h5 class="card-title">{{ receta.titulo }}</h5>
              <p class="card-text">{{ receta.descripcion }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="badge bg-primary">{{ receta.categoria }}</span>
                <span class="badge bg-secondary">{{ receta.dificultad }}</span>
              </div>
            </div>
            <div class="card-footer">
              <div class="d-flex justify-content-between">
                <a [routerLink]="['/recetas', receta._id]" class="btn btn-outline-primary">Ver Detalles</a>
                <button class="btn btn-outline-danger" (click)="deleteReceta(receta._id || '')">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RecetaListComponent implements OnInit {
  recetas: Receta[] = [];
  error: string | null = null;

  constructor(private recetaService: RecetaService) {}

  ngOnInit(): void {
    this.loadRecetas();
  }

  loadRecetas(): void {
    console.log('Cargando recetas...');
    this.recetaService.getRecetas().subscribe({
      next: (data) => {
        console.log('Recetas cargadas:', data);
        this.recetas = data;
        this.error = null;
      },
      error: (error) => {
        console.error('Error al cargar las recetas:', error);
        this.error = 'Error al cargar las recetas. Por favor, intenta de nuevo.';
      }
    });
  }

  deleteReceta(id: string): void {
    if (!id) {
      console.error('ID de receta no válido');
      return;
    }
    
    if (confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
      console.log('Eliminando receta:', id);
      this.recetaService.deleteReceta(id).subscribe({
        next: () => {
          console.log('Receta eliminada exitosamente');
          this.recetas = this.recetas.filter(receta => receta._id !== id);
          this.error = null;
        },
        error: (error) => {
          console.error('Error al eliminar la receta:', error);
          this.error = 'Error al eliminar la receta. Por favor, intenta de nuevo.';
        }
      });
    }
  }
} 