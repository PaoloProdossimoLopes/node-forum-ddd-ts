import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface Request {
  page: number
  questionId: string
}

type Response = Either<
  void,
  {
    comments: QuestionComment[]
  }
>

export class FetchCommentsOnQuestionUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { page, questionId } = request
    const question = await this.questionsRepository.findById(questionId)
    if (!question) throw new Error('Question not found')

    const comments = await this.questionCommentsRepository.findMany({ page })

    return right({ comments })
  }
}
