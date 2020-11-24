import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseResultsExtended, CreateCourseResult, EditCourseResult } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseResultService {
  constructor(private httpClient: HttpClient) {}
  getCourseResults() {
    return this.httpClient.get<CourseResultsExtended[]>('CourseResult');
  }

  createCourseResult(result: CreateCourseResult) {
    return this.httpClient.post('CourseResult', result);
  }
  editCourseResult(result: EditCourseResult) {
    return this.httpClient.post('CourseResult', result);
  }
}
