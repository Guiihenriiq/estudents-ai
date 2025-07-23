import { Request, Response } from 'express'
import { SupabaseStudentRepository } from '../infra/repositories/SupabaseStudentRepository'
import { CreateStudentUseCase } from '../usecases/CreateStudentUseCase'

const repository = new SupabaseStudentRepository()

export class StudentController {
  static async create(req: Request, res: Response) {
    try {
      const useCase = new CreateStudentUseCase(repository)
      await useCase.execute(req.body)
      res.status(201).send()
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const students = await repository.findAll()
      res.json(students)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
}
