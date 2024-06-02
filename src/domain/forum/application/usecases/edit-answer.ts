import { AnswersRepository } from '../repositories/answers-repository'

interface Request {
  authorId: string
  answerId: string
  content: string
}

type Response = void

export class EditAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute(request: Request): Promise<Response> {
    const { authorId, answerId, content } = request

    const answer = await this.answersRepository.findById(answerId)
    if (!answer) throw new Error('Question not found')

    if (answer.authorId !== authorId) throw new Error('not allowed')

    answer.content = content

    await this.answersRepository.save(answer)
  }
}
