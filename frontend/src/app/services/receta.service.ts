import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Receta {
  _id?: string;
  titulo: string;
  descripcion: string;
  imagen?: string;
  tiempoPreparacion: number;
  tiempoCoccion: number;
  porciones: number;
  dificultad: string;
  categoria: string;
  ingredientes: {
    nombre: string;
    cantidad: string;
    unidad: string;
  }[];
  instrucciones: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log('API URL:', this.apiUrl); // Para debugging
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en el servicio de recetas:', error);
    let errorMessage = 'Ha ocurrido un error en el servidor.';
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }

  getRecetas(): Observable<Receta[]> {
    console.log('Obteniendo lista de recetas...');
    return this.http.get<Receta[]>(this.apiUrl).pipe(
      tap(recetas => console.log('Recetas obtenidas:', recetas)),
      catchError(this.handleError)
    );
  }

  getReceta(id: string): Observable<Receta> {
    console.log('Obteniendo receta con ID:', id);
    return this.http.get<Receta>(`${this.apiUrl}/${id}`).pipe(
      tap(receta => console.log('Receta obtenida:', receta)),
      catchError(this.handleError)
    );
  }

  createReceta(receta: Receta): Observable<Receta> {
    console.log('Creando nueva receta:', receta);
    return this.http.post<Receta>(this.apiUrl, receta).pipe(
      tap(recetaCreada => console.log('Receta creada:', recetaCreada)),
      catchError(this.handleError)
    );
  }

  updateReceta(id: string, receta: Receta): Observable<Receta> {
    console.log('Actualizando receta:', { id, receta });
    return this.http.put<Receta>(`${this.apiUrl}/${id}`, receta).pipe(
      tap(recetaActualizada => console.log('Receta actualizada:', recetaActualizada)),
      catchError(this.handleError)
    );
  }

  deleteReceta(id: string): Observable<void> {
    console.log('Eliminando receta con ID:', id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('Receta eliminada exitosamente')),
      catchError(this.handleError)
    );
  }
} 