import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  slug: string
}

type Response = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { slug } = request

    const question = await this.questionsRepository.findBySlug(slug)
    if (!question) return left(new ResourceNotFoundError())

    return right({ question })
  }
}
