import { QuestionsRepository } from '../repositories/questions-repository'

interface Request {
  questionId: string
}

type Response = void

export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { questionId } = request

    const question = await this.questionsRepository.findById(questionId)
    if (!question) throw new Error('Question not found')

    await this.questionsRepository.delete(questionId)
  }
}
