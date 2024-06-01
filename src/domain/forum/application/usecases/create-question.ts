import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface Request {
  authorId: string
  title: string
  content: string
}

interface Response {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { authorId, title, content } = request
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    await this.questionsRepository.create(question)

    return {
      question,
    }
  }
}
