import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Subject } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  getSubjects() {
    // tslint:disable-next-line: variable-name
    return new BehaviorSubject<Subject[]>([...Array(20)].map((_, i) => ({ id: i, name: 'Tantárgy ' + i })))
      .asObservable()
      .pipe(delay(300));
  }

  createSubject(name: string) {
    return new BehaviorSubject({}).asObservable().pipe(delay(300));
  }
  editSubject(id: number, name: string) {
    return new BehaviorSubject({}).asObservable().pipe(delay(300));
  }
}
