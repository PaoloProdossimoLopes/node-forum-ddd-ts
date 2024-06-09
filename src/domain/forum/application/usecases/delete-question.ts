import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  questionId: string
}

type Response = Either<ResourceNotFoundError, object>

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { questionId } = request

    const question = await this.questionsRepository.findById(questionId)
    if (!question) return left(new ResourceNotFoundError())

    await this.questionsRepository.delete(questionId)
    return right({})
  }
}
