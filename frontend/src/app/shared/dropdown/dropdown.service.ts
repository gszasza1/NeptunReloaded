import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

import { CourseSelect, RoomSelect, StudentForExamSelect, SubjectSelect } from '../backend.interface';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private httpClient: HttpClient) {}
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
    return this.httpClient.get<RoomSelect[]>('Room/available');
  }
  getSubjects() {
    return this.httpClient.get<SubjectSelect[]>('Subject/select');
  }
}
