import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Examen } from '../models/exam.model';

@Injectable({
  providedIn: 'root',
})
export class ExamensService {
  private apiUrl = 'http://localhost:3000/api/exams';

  constructor(private http: HttpClient) {}

  GetExamens(): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.apiUrl);
  }

  CreateExamen(examen: Examen): Observable<Examen> {
    return this.http.post<Examen>(this.apiUrl, examen);
  }
}