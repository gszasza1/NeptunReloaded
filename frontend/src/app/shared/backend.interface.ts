export interface RegisterUser {
  username: string;
  firstName: string;
  lastName: string;
  neptun: string;
  password: string;
}
export interface ChangePassword {
  value: string;
}
export interface ChangeUsername {
  value: string;
}
export interface LoginUser {
  username: string;
  password: string;
}
export interface UserProfil {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  neptun: string;
  createdAt: Date;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Room {
  id: number;
  name: string;
}

export interface CreateCourse {
  name: string;
  subjectId: number;
  roomId: string;
}
export interface MinimalUser {
  id: number;
  role: string;
  username: string;
}
export interface ChangeUserRole {
  userId: number;
  newRole: string;
}
export interface CoursesPopUp {
  id: number;
  subject: Subject;
  name: string;
  room: Room;
  user: {
    name: string;
    id: number;
  };
  member: boolean;
}
export interface CourseSelect {
  id: number;
  name: string;
}
export interface ExamSelect {
  id: number;
  name: string;
}
export interface StudentForExamSelect {
  id: number;
  name: string;
  neptun: string;
}
export interface Exams {
  id: number;
  name: string;
}
export interface CreateExam {
  courseId: number;
  name: string;
}

export interface ExamResults {
  id: number;
  score: number;
  examName: string;
  neptun: string;
}

export interface CreateExamResult {
  studentId: number;
  examId: number;
  score: number;
}

export interface CourseList {
  id: number;
  name: string;
}
export interface RoomSelect {
  id: number;
  name: string;
}

export interface SubjectSelect {
  id: number;
  name: string;
}
export interface EditRoom {
  id: number;
  newName: string;
}
export interface CreateRoom {
  name: string;
}
export interface EditSubject {
  id: number;
  newName: string;
}
export interface CreateSubject {
  name: string;
}
