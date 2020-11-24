import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CourseSelect, MinimalUser, RoomSelect, SubjectSelect } from '../backend.interface';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private httpClient: HttpClient) {}
  getCourses() {
    return this.httpClient.get<SubjectSelect[]>('Course/select/self');
  }
  getExams() {
    return this.httpClient.get<CourseSelect[]>('Exam/select');
  }

  getStudentForExams(courseId: number) {
     return this.httpClient.get<MinimalUser[]>(`Subject/select/on-course/${courseId}`);
  }
  getRooms() {
    return this.httpClient.get<RoomSelect[]>('Room/available');
  }
  getSubjects() {
    return this.httpClient.get<SubjectSelect[]>('Subject/select');
  }
}
