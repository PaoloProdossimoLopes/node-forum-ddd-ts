import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

describe('Answer quesiton', () => {
  it('should be able to answer a question', async () => {
    const answerContent = 'new answer'
    const instructorId = 'any-instructor-id'
    const questionId = 'any-question-id'
    const answersRepository = new AnswersRepositoryMock()
    const sut = new AnswerQuestionUseCase(answersRepository)

    const answer = await sut.execute({
      instructorId,
      questionId,
      answerContent,
    })

    expect(answersRepository.answers.length).toEqual(1)
    expect(answersRepository.answers[0]).toBe(answer)
    expect(answer.content).toEqual(answerContent)
    expect(answer.authorId).toEqual(instructorId)
    expect(answer.questionId).toEqual(questionId)
  })
})

class AnswersRepositoryMock implements AnswersRepository {
  answers: Answer[] = []

  async create(answer: Answer) {
    this.answers.push(answer)
  }
}
