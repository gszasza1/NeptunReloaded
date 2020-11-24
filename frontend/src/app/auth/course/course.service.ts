import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseList, CreateCourse, EditCourse } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private httpClient: HttpClient) {}
  getCourses() {
     return this.httpClient.get<CourseList[]>('Course');  
  }

  createCourse(course: CreateCourse) {
    return this.httpClient.post('Course', course);  
  }
  editCourse(course: EditCourse) {
    return this.httpClient.put('Course', course);  }
    
}
