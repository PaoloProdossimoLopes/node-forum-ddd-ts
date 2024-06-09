import { Either, left, right } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  questionCommentId: string
}

type Response = Either<ResourceNotFoundError, object>

export class DeleteQuestionCommentUseCase {
  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { questionCommentId } = request

    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)
    if (!questionComment) return left(new ResourceNotFoundError())

    await this.questionCommentsRepository.delete(questionComment)
    return right({})
  }
}
