import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exams } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class MyExamsService {
  constructor(private httpClient: HttpClient) {}
  getExams() {
    return this.httpClient.get<Exams[]>('Exam/joined');
  }
}
