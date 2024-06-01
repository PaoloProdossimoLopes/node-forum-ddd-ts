import { QuestionsRepository } from '../repositories/questions-repository'

interface Request {
  questionId: string
}

type Response = void

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { questionId } = request

    await this.questionsRepository.delete(questionId)
  }
}
