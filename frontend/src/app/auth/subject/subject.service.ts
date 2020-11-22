import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateSubject, EditSubject, Subject } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private httpClient: HttpClient) {}
  getSubjects() {
    return this.httpClient.get<Subject[]>('Subject');
  }

  createSubject(subject: CreateSubject) {
    return this.httpClient.post('Subject', subject);
  }
  editSubject(subject: EditSubject) {
    return this.httpClient.put('Subject', subject);
  }
}
