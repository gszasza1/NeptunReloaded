import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Courses } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseDialogService {
  getCoursesForSubject() {
    return new BehaviorSubject<Courses[]>(
      [...Array(20)].map((_, i) => ({
        id: i,
        member: i % 2 === 0,
        room: { id: i, name: 'Terem ' + i },
        subject: { id: i, name: 'Tárgy ' + i },
        user: { id: i, name: 'Előadó' },
        name: 'Tantárgy ' + i,
      }))
    )
      .asObservable()
      .pipe(delay(300));
  }
  join(courseId: number) {
    return new BehaviorSubject({}).asObservable().pipe(delay(300));
  }
}
