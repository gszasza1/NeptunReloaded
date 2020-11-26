import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseResultsExtended } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class MyResultService {
  constructor(private httpClient: HttpClient) {}
  getCourseResults() {
    return this.httpClient.get<CourseResultsExtended[]>('CourseResult/self');
  }
}
