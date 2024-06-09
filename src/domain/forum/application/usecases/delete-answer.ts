import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  answerId: string
}

type Response = Either<ResourceNotFoundError, object>

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute(request: Request): Promise<Response> {
    const { answerId } = request

    const answer = await this.answersRepository.findById(answerId)
    if (!answer) return left(new ResourceNotFoundError())

    await this.answersRepository.delete(answer)
    return right({})
  }
}
