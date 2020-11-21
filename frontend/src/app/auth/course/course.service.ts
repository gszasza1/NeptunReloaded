import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CourseList, CreateCourse } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  getCourses() {
    // tslint:disable-next-line: variable-name
    return new BehaviorSubject<CourseList[]>([...Array(20)].map((_, i) => ({ id: i, name: 'Tantárgy ' + i })))
      .asObservable()
      .pipe(delay(300));
  }

  createCourse(course: CreateCourse) {
    return new BehaviorSubject({}).asObservable().pipe(delay(300));
  }
  editCourse(id: number, name: string) {
    return new BehaviorSubject({}).asObservable().pipe(delay(300));
  }
}
