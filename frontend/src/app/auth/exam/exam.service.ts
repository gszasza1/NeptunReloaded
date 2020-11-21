import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Exams } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  getExams() {
    // tslint:disable-next-line: variable-name
    return new BehaviorSubject<Exams[]>([...Array(20)].map((_, i) => ({ id: i, name: 'Szoba ' + i })))
      .asObservable()
      .pipe(delay(300));
  }

  createExams(name: string) {
    return new BehaviorSubject({}).asObservable().pipe(delay(300));
  }
  editExams(id: number, name: string) {
    return new BehaviorSubject({}).asObservable().pipe(delay(300));
  }
}
