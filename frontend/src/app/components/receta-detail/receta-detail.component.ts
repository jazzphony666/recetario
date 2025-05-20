import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService, Receta } from '../../services/receta.service';

@Component({
  selector: 'app-receta-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" *ngIf="receta">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="card">
            <img [src]="receta.imagen || 'assets/default-recipe.jpg'" class="card-img-top" [alt]="receta.titulo">
            <div class="card-body">
              <h1 class="card-title">{{ receta.titulo }}</h1>
              <p class="card-text">{{ receta.descripcion }}</p>
              
              <div class="row mb-4">
                <div class="col-md-4">
                  <h5>Tiempo de Preparación</h5>
                  <p>{{ receta.tiempoPreparacion }} minutos</p>
                </div>
                <div class="col-md-4">
                  <h5>Tiempo de Cocción</h5>
                  <p>{{ receta.tiempoCoccion }} minutos</p>
                </div>
                <div class="col-md-4">
                  <h5>Porciones</h5>
                  <p>{{ receta.porciones }}</p>
                </div>
              </div>

              <div class="mb-4">
                <h3>Ingredientes</h3>
                <ul class="list-group">
                  <li class="list-group-item" *ngFor="let ingrediente of receta.ingredientes">
                    {{ ingrediente.cantidad }} {{ ingrediente.unidad }} de {{ ingrediente.nombre }}
                  </li>
                </ul>
              </div>

              <div class="mb-4">
                <h3>Instrucciones</h3>
                <ol class="list-group list-group-numbered">
                  <li class="list-group-item" *ngFor="let instruccion of receta.instrucciones">
                    {{ instruccion }}
                  </li>
                </ol>
              </div>

              <div class="d-flex justify-content-between">
                <button class="btn btn-secondary" (click)="goBack()">Volver</button>
                <button class="btn btn-danger" (click)="deleteReceta()">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-img-top {
      height: 400px;
      object-fit: cover;
    }
    .list-group-item {
      border-left: none;
      border-right: none;
    }
  `]
})
export class RecetaDetailComponent implements OnInit {
  receta: Receta | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetaService: RecetaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadReceta(id);
    }
  }

  loadReceta(id: string): void {
    this.recetaService.getReceta(id).subscribe({
      next: (receta) => {
        this.receta = receta;
      },
      error: (error) => {
        console.error('Error al cargar la receta:', error);
        this.router.navigate(['/recetas']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/recetas']);
  }

  deleteReceta(): void {
    if (this.receta && this.receta._id) {
      if (confirm('¿Estás seguro de que deseas eliminar esta receta?')) {
        this.recetaService.deleteReceta(this.receta._id).subscribe({
          next: () => {
            this.router.navigate(['/recetas']);
          },
          error: (error) => {
            console.error('Error al eliminar la receta:', error);
          }
        });
      }
    }
  }
} 