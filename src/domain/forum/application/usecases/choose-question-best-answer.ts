import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface Request {
  answerId: string
  authorId: string
}

interface Response {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly answersRepository: AnswersRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { answerId, authorId } = request

    const answer = await this.answersRepository.findById(answerId)
    if (!answer) throw new Error('answer not found')

    const question = await this.questionsRepository.findById(answer.questionId)
    if (!question) throw new Error('question not found')

    if (question.authorId !== authorId) throw new Error('Not allowed')

    question.bestAnswerId = new UniqueEntityId(answerId)

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}
