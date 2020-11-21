import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

import { CourseSelect } from '../backend.interface';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  getCourses() {
    return new BehaviorSubject<CourseSelect[]>([...Array(20)].map((_, i) => ({ id: i, name: 'Tantárgy ' + i })))
      .asObservable()
      .pipe(delay(300));
  }
}
