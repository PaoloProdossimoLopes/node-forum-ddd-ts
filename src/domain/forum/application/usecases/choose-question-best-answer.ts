import { Either, left, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  answerId: string
  authorId: string
}

type Response = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly answersRepository: AnswersRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { answerId, authorId } = request

    const answer = await this.answersRepository.findById(answerId)
    if (!answer) return left(new ResourceNotFoundError())

    const question = await this.questionsRepository.findById(answer.questionId)
    if (!question) return left(new ResourceNotFoundError())

    if (question.authorId !== authorId) return left(new NotAllowedError())

    question.bestAnswerId = new UniqueEntityId(answerId)

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
