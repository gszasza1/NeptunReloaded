import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoursesPopUp, JoinCourse } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseDialogService {
  constructor(private httpClient: HttpClient) {}
  getCoursesForSubject(subjectId: number) {
    return this.httpClient.get<CoursesPopUp[]>('Course/subject/' + subjectId);
  }
  join(course: JoinCourse) {
    return this.httpClient.post<JoinCourse[]>('Course/join', course);
  }
 
}
