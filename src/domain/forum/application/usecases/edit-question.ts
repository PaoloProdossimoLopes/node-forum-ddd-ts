import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  authorId: string
  questionId: string
  title: string
  content: string
}

type Response = Either<ResourceNotFoundError | NotAllowedError, object>

export class EditQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { authorId, questionId, title, content } = request

    const question = await this.questionsRepository.findById(questionId)
    if (!question) return left(new ResourceNotFoundError())

    if (question.authorId !== authorId) return left(new NotAllowedError())

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)
    return right({})
  }
}
