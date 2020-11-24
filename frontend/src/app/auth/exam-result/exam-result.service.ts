import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateExamResult, EditExamResult, ExamResults } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class ExamResultService {
  
  constructor(private httpClient: HttpClient) {}
  getExamResults() {
    return this.httpClient.get<ExamResults[]>('Examresult');
  }

  createExamResult(result: CreateExamResult) {
     return this.httpClient.post('Examresult', result);
  }
  editExamResult(result: EditExamResult) {
    return this.httpClient.post('Examresult', result);
  }
}
