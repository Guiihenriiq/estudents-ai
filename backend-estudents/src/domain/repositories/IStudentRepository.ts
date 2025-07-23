import { Student } from '../entities/Student'

export interface IStudentRepository {
  create(student: Student): Promise<void>
  findAll(): Promise<Student[]>
}
