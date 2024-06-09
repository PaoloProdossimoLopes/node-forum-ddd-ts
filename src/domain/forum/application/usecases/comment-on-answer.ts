import { Either, left, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  authorId: string
  answerId: string
  content: string
}

type Response = Either<
  ResourceNotFoundError,
  {
    comment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { authorId, content, answerId } = request

    const answer = await this.answersRepository.findById(answerId)
    if (!answer) return left(new ResourceNotFoundError())

    const questionComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentsRepository.create(questionComment)

    return right({ comment: questionComment })
  }
}
