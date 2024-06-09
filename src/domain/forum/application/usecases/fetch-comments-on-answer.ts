import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'

interface Request {
  page: number
  answerId: string
}

interface Response {
  comments: AnswerComment[]
}

export class FetchCommentsOnAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { page, answerId } = request
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) throw new Error('Answer not found')

    const comments = await this.answerCommentsRepository.findMany({ page })

    return {
      comments,
    }
  }
}
