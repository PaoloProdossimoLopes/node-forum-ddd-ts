import { InMemmoryQuestionsRepository } from '../repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

describe('Create question', () => {
  it('should be able to create a question', async () => {
    const authorId = 'any author id'
    const content = 'any content'
    const title = 'any title id'
    const answersRepository = new InMemmoryQuestionsRepository()
    const sut = new CreateQuestionUseCase(answersRepository)

    const { question } = await sut.execute({
      authorId,
      content,
      title,
    })

    expect(answersRepository.questions.length).toEqual(1)
    expect(answersRepository.questions[0]).toBe(question)
    expect(question.id).toBeTruthy()
    expect(question.createdAt).toBeTruthy()
    expect(question.updatedAt).toBeFalsy()
    expect(question.content).toEqual(content)
    expect(question.authorId).toEqual(authorId)
    expect(question.title).toEqual(title)
  })
})
