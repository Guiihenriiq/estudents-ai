import { z } from 'zod'
import { IStudentRepository } from '../domain/repositories/IStudentRepository'

// Validação com zod
const studentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
})

export class CreateStudentUseCase {
  constructor(private repository: IStudentRepository) {}

  async execute(input: unknown): Promise<void> {
    const data = studentSchema.parse(input) // <- valida com Zod
    await this.repository.create(data)
  }
}
