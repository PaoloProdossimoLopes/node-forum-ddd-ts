import { AnswersRepository } from '../repositories/answers-repository'

interface Request {
  answerId: string
}

type Response = void

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute(request: Request): Promise<Response> {
    const { answerId } = request

    const answer = await this.answersRepository.findById(answerId)
    if (!answer) throw new Error('Answer not founded')

    await this.answersRepository.delete(answer)
  }
}
