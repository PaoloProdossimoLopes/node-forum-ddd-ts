import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

describe('Answer quesiton', () => {
  it('should be able to answer a question', async () => {
    const answerContent = 'new answer'
    const instructorId = 'any-instructor-id'
    const questionId = 'any-question-id'
    const answersRepository = new InMemoryAnswersRepository()
    const sut = new AnswerQuestionUseCase(answersRepository)

    const result = await sut.execute({
      instructorId,
      questionId,
      answerContent,
    })

    expect(result.isRight()).toBeTruthy()
    expect(answersRepository.answers.length).toEqual(1)
    expect(answersRepository.answers[0]).toBe(result.value?.answer)
    expect(result.value?.answer.content).toEqual(answerContent)
    expect(result.value?.answer.authorId).toEqual(instructorId)
    expect(result.value?.answer.questionId).toEqual(questionId)
  })
})
