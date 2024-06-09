import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface Request {
  answerCommentId: string
}

type Response = void

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { answerCommentId } = request

    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)
    if (!answerComment) throw new Error('Answer comment not found')

    await this.answerCommentsRepository.delete(answerComment)
  }
}
