import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateExam, EditExam, Exams, JoinExam, LeaveExam } from 'src/app/shared/backend.interface';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private httpClient: HttpClient) {}
  getExams() {
    return this.httpClient.get<Exams[]>('Exam');
  }

  createExams(exam: CreateExam) {
    return this.httpClient.post('Exam', exam);
  }
  editExams(exam: EditExam) {
    return this.httpClient.put('Exam', exam);
  }
  deleteExam(examId: number) {
    return this.httpClient.put('Exam', examId);
  }
  joinExam(exam: JoinExam) {
    return this.httpClient.post('Exam/join', exam);
  }
  leaveExam(exam: LeaveExam) {
    return this.httpClient.post('Exam/leave', exam);
  }
}
