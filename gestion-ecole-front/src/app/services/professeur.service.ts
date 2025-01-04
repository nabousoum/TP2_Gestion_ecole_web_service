import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {
  private apiUrl = 'http://localhost:8080/professeurs/api/profs'; // Via API Gateway

  constructor(private http: HttpClient) {}

  getProfesseurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProfesseur(professeur: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, professeur);
  }

  updateProfesseur(id: string, professeur: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, professeur);
  }

  deleteProfesseur(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
