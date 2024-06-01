import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface Request {
  slug: string
}

interface Response {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { slug } = request

    const question = await this.questionsRepository.findBySlug(slug)
    if (!question) throw new Error('Question not founded by slug')

    return {
      question,
    }
  }
}
