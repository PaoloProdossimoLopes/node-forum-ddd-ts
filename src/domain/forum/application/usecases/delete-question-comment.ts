import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface Request {
  questionCommentId: string
}

type Response = void

export class DeleteQuestionCommentUseCase {
  constructor(
    private readonly questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { questionCommentId } = request

    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)
    if (!questionComment) throw new Error('Question comment not found')

    await this.questionCommentsRepository.delete(questionComment)
  }
}
