import { IStudentRepository } from '../../domain/repositories/IStudentRepository'
import { Student } from '../../domain/entities/Student'
import { supabase } from '../supabaseClient'

export class SupabaseStudentRepository implements IStudentRepository {
  async create(student: Student): Promise<void> {
    const { error } = await supabase.from('students').insert([student])
    if (error) throw new Error(error.message)
  }

  async findAll(): Promise<Student[]> {
    const { data, error } = await supabase.from('students').select('*')
    if (error) throw new Error(error.message)
    return data as Student[]
  }
}
