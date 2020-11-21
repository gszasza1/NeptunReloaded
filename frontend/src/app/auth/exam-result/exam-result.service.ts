import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CreateExamResult, ExamResults } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class ExamResultService {
  getExamResults() {
    // tslint:disable-next-line: variable-name
    return new BehaviorSubject<ExamResults[]>(
      [...Array(20)].map((_, i) => ({ id: i, examName: 'Viszga ' + i, neptun: 'NEPTUN', score: i * 7 + i / 2 }))
    )
      .asObservable()
      .pipe(delay(300));
  }

  createExamResult(result: CreateExamResult) {
    return new BehaviorSubject({}).asObservable().pipe(delay(300));
  }
  editExamResult(id: number, name: string) {
    return new BehaviorSubject({}).asObservable().pipe(delay(300));
  }
}
