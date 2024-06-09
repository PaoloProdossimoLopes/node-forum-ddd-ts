import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface Request {
  page: number
}

type Response = Either<
  void,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { page } = request

    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({ questions })
  }
}
