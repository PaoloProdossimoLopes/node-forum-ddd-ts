import { Either, left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  authorId: string
  answerId: string
  content: string
}

type Response = Either<ResourceNotFoundError | NotAllowedError, object>

export class EditAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute(request: Request): Promise<Response> {
    const { authorId, answerId, content } = request

    const answer = await this.answersRepository.findById(answerId)
    if (!answer) return left(new NotAllowedError())

    if (answer.authorId !== authorId) return left(new NotAllowedError())

    answer.content = content

    await this.answersRepository.save(answer)
    return right({})
  }
}
