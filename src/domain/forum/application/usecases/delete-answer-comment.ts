import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  answerCommentId: string
}

type Response = Either<ResourceNotFoundError, object>

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { answerCommentId } = request

    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)
    if (!answerComment) return left(new ResourceNotFoundError())

    await this.answerCommentsRepository.delete(answerComment)
    return right({})
  }
}
