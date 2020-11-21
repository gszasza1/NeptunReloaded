import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

import { CourseSelect, RoomSelect, StudentForExamSelect, SubjectSelect } from '../backend.interface';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  getCourses() {
    return new BehaviorSubject<CourseSelect[]>([...Array(20)].map((_, i) => ({ id: i, name: 'Tantárgy ' + i })))
      .asObservable()
      .pipe(delay(300));
  }
  getExams() {
    return new BehaviorSubject<CourseSelect[]>([...Array(20)].map((_, i) => ({ id: i, name: 'Vizsga ' + i })))
      .asObservable()
      .pipe(delay(300));
  }

  getStudentForExams() {
    return new BehaviorSubject<StudentForExamSelect[]>(
      [...Array(20)].map((_, i) => ({ id: i, name: 'Béla ' + i, neptun: 'NEPTUN ' + i }))
    )
      .asObservable()
      .pipe(delay(300));
  }
  getRooms() {
    return new BehaviorSubject<RoomSelect[]>([...Array(20)].map((_, i) => ({ id: i, name: 'Szoba ' + i })))
      .asObservable()
      .pipe(delay(300));
  }
  getSubjects() {
    return new BehaviorSubject<SubjectSelect[]>([...Array(20)].map((_, i) => ({ id: i, name: 'Tárgy ' + i })))
      .asObservable()
      .pipe(delay(300));
  }
}
