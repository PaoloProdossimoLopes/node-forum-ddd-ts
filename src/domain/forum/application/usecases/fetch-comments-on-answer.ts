import { Either, left, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  page: number
  answerId: string
}

type Response = Either<
  ResourceNotFoundError,
  {
    comments: AnswerComment[]
  }
>

export class FetchCommentsOnAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { page, answerId } = request
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) return left(new ResourceNotFoundError())

    const comments = await this.answerCommentsRepository.findMany({ page })

    return right({ comments })
  }
}
