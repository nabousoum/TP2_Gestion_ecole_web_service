import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Etudiant } from '../models/etudiant.model';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  private apiUrl = 'http://localhost:8080/api/etudiants';

  private etudiantsSubject = new BehaviorSubject<Etudiant[]>([]);
  etudiants$ = this.etudiantsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Charger les étudiants
  loadEtudiants(): void {
    this.http.get<Etudiant[]>(this.apiUrl).subscribe((etudiants) => {
      this.etudiantsSubject.next(etudiants);
    });
  }

  // Ajouter un étudiant
  addEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(this.apiUrl, etudiant).pipe(
      tap((newEtudiant) => {
        const currentEtudiants = this.etudiantsSubject.value;
        this.etudiantsSubject.next([...currentEtudiants, newEtudiant]);
      })
    );
  }

  // Modifier un étudiant
  updateEtudiant(id: number, etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.apiUrl}/${id}`, etudiant).pipe(
      tap((updatedEtudiant) => {
        const currentEtudiants = this.etudiantsSubject.value;
        const index = currentEtudiants.findIndex((e) => e.id === id);
        if (index > -1) {
          currentEtudiants[index] = updatedEtudiant;
          this.etudiantsSubject.next([...currentEtudiants]);
        }
      })
    );
  }

  // Supprimer un étudiant
  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentEtudiants = this.etudiantsSubject.value;
        this.etudiantsSubject.next(
          currentEtudiants.filter((e) => e.id !== id)
        );
      })
    );
  }
}
