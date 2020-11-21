export interface RegisterUser {
  username: string;
  firstName: string;
  lastName: string;
  neptun: string;
  password: string;
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

export interface Courses {
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
export interface Exams {
  id: number;
  name: string;
}
export interface CreateExam {
  courseId: number;
  name: string;
}
