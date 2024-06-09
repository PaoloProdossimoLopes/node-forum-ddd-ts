import { Either, right } from '@/core/either'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  answerContent: string
}

type Response = Either<
  void,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private readonly answerRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    answerContent,
  }: AnswerQuestionUseCaseRequest): Promise<Response> {
    const answer = Answer.create({
      content: answerContent,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
