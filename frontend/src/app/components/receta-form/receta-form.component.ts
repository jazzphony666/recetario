import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecetaService, Receta } from '../../services/receta.service';

@Component({
  selector: 'app-receta-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="card">
            <div class="card-body">
              <h2>{{ isEditing ? 'Editar' : 'Nueva' }} Receta</h2>
              
              <div *ngIf="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>

              <form [formGroup]="recetaForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label for="titulo" class="form-label">Título</label>
                  <input type="text" class="form-control" id="titulo" formControlName="titulo">
                  <div class="text-danger" *ngIf="recetaForm.get('titulo')?.invalid && recetaForm.get('titulo')?.touched">
                    El título es requerido
                  </div>
                </div>

                <div class="mb-3">
                  <label for="descripcion" class="form-label">Descripción</label>
                  <textarea class="form-control" id="descripcion" formControlName="descripcion" rows="3"></textarea>
                  <div class="text-danger" *ngIf="recetaForm.get('descripcion')?.invalid && recetaForm.get('descripcion')?.touched">
                    La descripción es requerida
                  </div>
                </div>

                <div class="mb-3">
                  <label for="imagen" class="form-label">URL de la imagen</label>
                  <input type="url" class="form-control" id="imagen" formControlName="imagen">
                </div>

                <div class="row mb-3">
                  <div class="col-md-4">
                    <label for="tiempoPreparacion" class="form-label">Tiempo de Preparación (min)</label>
                    <input type="number" class="form-control" id="tiempoPreparacion" formControlName="tiempoPreparacion">
                    <div class="text-danger" *ngIf="recetaForm.get('tiempoPreparacion')?.invalid && recetaForm.get('tiempoPreparacion')?.touched">
                      El tiempo de preparación es requerido
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label for="tiempoCoccion" class="form-label">Tiempo de Cocción (min)</label>
                    <input type="number" class="form-control" id="tiempoCoccion" formControlName="tiempoCoccion">
                    <div class="text-danger" *ngIf="recetaForm.get('tiempoCoccion')?.invalid && recetaForm.get('tiempoCoccion')?.touched">
                      El tiempo de cocción es requerido
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label for="porciones" class="form-label">Porciones</label>
                    <input type="number" class="form-control" id="porciones" formControlName="porciones">
                    <div class="text-danger" *ngIf="recetaForm.get('porciones')?.invalid && recetaForm.get('porciones')?.touched">
                      Las porciones son requeridas
                    </div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="dificultad" class="form-label">Dificultad</label>
                  <select class="form-select" id="dificultad" formControlName="dificultad">
                    <option value="Fácil">Fácil</option>
                    <option value="Media">Media</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                  <div class="text-danger" *ngIf="recetaForm.get('dificultad')?.invalid && recetaForm.get('dificultad')?.touched">
                    La dificultad es requerida
                  </div>
                </div>

                <div class="mb-3">
                  <label for="categoria" class="form-label">Categoría</label>
                  <input type="text" class="form-control" id="categoria" formControlName="categoria">
                  <div class="text-danger" *ngIf="recetaForm.get('categoria')?.invalid && recetaForm.get('categoria')?.touched">
                    La categoría es requerida
                  </div>
                </div>

                <div formArrayName="ingredientes" class="mb-3">
                  <h4>Ingredientes</h4>
                  <div *ngFor="let ingrediente of ingredientesArray.controls; let i=index" [formGroupName]="i" class="row mb-2">
                    <div class="col-md-4">
                      <input type="text" class="form-control" placeholder="Nombre" formControlName="nombre">
                      <div class="text-danger" *ngIf="ingrediente.get('nombre')?.invalid && ingrediente.get('nombre')?.touched">
                        El nombre es requerido
                      </div>
                    </div>
                    <div class="col-md-3">
                      <input type="text" class="form-control" placeholder="Cantidad" formControlName="cantidad">
                      <div class="text-danger" *ngIf="ingrediente.get('cantidad')?.invalid && ingrediente.get('cantidad')?.touched">
                        La cantidad es requerida
                      </div>
                    </div>
                    <div class="col-md-3">
                      <input type="text" class="form-control" placeholder="Unidad" formControlName="unidad">
                      <div class="text-danger" *ngIf="ingrediente.get('unidad')?.invalid && ingrediente.get('unidad')?.touched">
                        La unidad es requerida
                      </div>
                    </div>
                    <div class="col-md-2">
                      <button type="button" class="btn btn-danger" (click)="removeIngrediente(i)">Eliminar</button>
                    </div>
                  </div>
                  <button type="button" class="btn btn-secondary" (click)="addIngrediente()">Agregar Ingrediente</button>
                </div>

                <div formArrayName="instrucciones" class="mb-3">
                  <h4>Instrucciones</h4>
                  <div *ngFor="let instruccion of instruccionesArray.controls; let i=index" class="mb-2">
                    <div class="input-group">
                      <span class="input-group-text">{{i + 1}}</span>
                      <input type="text" class="form-control" [formControlName]="i">
                      <button type="button" class="btn btn-danger" (click)="removeInstruccion(i)">Eliminar</button>
                    </div>
                    <div class="text-danger" *ngIf="instruccion.invalid && instruccion.touched">
                      La instrucción es requerida
                    </div>
                  </div>
                  <button type="button" class="btn btn-secondary" (click)="addInstruccion()">Agregar Instrucción</button>
                </div>

                <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-secondary" (click)="goBack()">Cancelar</button>
                  <button type="submit" class="btn btn-primary" [disabled]="!recetaForm.valid || isSubmitting">
                    {{ isSubmitting ? 'Guardando...' : 'Guardar' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RecetaFormComponent implements OnInit {
  recetaForm: FormGroup;
  isEditing = false;
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private recetaService: RecetaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recetaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [''],
      tiempoPreparacion: [0, [Validators.required, Validators.min(0)]],
      tiempoCoccion: [0, [Validators.required, Validators.min(0)]],
      porciones: [1, [Validators.required, Validators.min(1)]],
      dificultad: ['Fácil', Validators.required],
      categoria: ['', Validators.required],
      ingredientes: this.fb.array([]),
      instrucciones: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.loadReceta(id);
    } else {
      this.addIngrediente();
      this.addInstruccion();
    }
  }

  get ingredientesArray() {
    return this.recetaForm.get('ingredientes') as FormArray;
  }

  get instruccionesArray() {
    return this.recetaForm.get('instrucciones') as FormArray;
  }

  addIngrediente() {
    const ingrediente = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      unidad: ['', Validators.required]
    });
    this.ingredientesArray.push(ingrediente);
  }

  removeIngrediente(index: number) {
    this.ingredientesArray.removeAt(index);
  }

  addInstruccion() {
    const instruccion = this.fb.control('', Validators.required);
    this.instruccionesArray.push(instruccion);
  }

  removeInstruccion(index: number) {
    this.instruccionesArray.removeAt(index);
  }

  loadReceta(id: string): void {
    this.recetaService.getReceta(id).subscribe({
      next: (receta) => {
        console.log('Receta cargada:', receta);
        this.recetaForm.patchValue(receta);
        receta.ingredientes.forEach(() => this.addIngrediente());
        receta.instrucciones.forEach(() => this.addInstruccion());
        this.recetaForm.patchValue(receta);
      },
      error: (error) => {
        console.error('Error al cargar la receta:', error);
        this.error = 'Error al cargar la receta. Por favor, intenta de nuevo.';
      }
    });
  }

  onSubmit(): void {
    if (this.recetaForm.valid) {
      this.isSubmitting = true;
      this.error = null;
      const receta: Receta = this.recetaForm.value;
      console.log('Enviando receta:', receta);

      if (this.isEditing) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.recetaService.updateReceta(id, receta).subscribe({
            next: () => {
              console.log('Receta actualizada exitosamente');
              this.router.navigate(['/recetas']);
            },
            error: (error) => {
              console.error('Error al actualizar la receta:', error);
              this.error = 'Error al actualizar la receta. Por favor, intenta de nuevo.';
              this.isSubmitting = false;
            }
          });
        }
      } else {
        this.recetaService.createReceta(receta).subscribe({
          next: () => {
            console.log('Receta creada exitosamente');
            this.router.navigate(['/recetas']);
          },
          error: (error) => {
            console.error('Error al crear la receta:', error);
            this.error = 'Error al crear la receta. Por favor, intenta de nuevo.';
            this.isSubmitting = false;
          }
        });
      }
    } else {
      console.log('Formulario inválido:', this.recetaForm.errors);
      Object.keys(this.recetaForm.controls).forEach(key => {
        const control = this.recetaForm.get(key);
        if (control?.invalid) {
          console.log(`${key} errors:`, control.errors);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/recetas']);
  }
} 