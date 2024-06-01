import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  answerContent: string
}

export class AnswerQuestionUseCase {
  constructor(private readonly answerRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    answerContent,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content: answerContent,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
