import { InMemmoryQuestionsRepository } from '../repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

describe('Create question', () => {
  it('should be able to create a question', async () => {
    const authorId = 'any author id'
    const content = 'any content'
    const title = 'any title id'
    const attachmentIds = ['attachment id 1', 'attachment id 2']
    const answersRepository = new InMemmoryQuestionsRepository()
    const sut = new CreateQuestionUseCase(answersRepository)

    const result = await sut.execute({
      authorId,
      content,
      title,
      attachmentIds,
    })

    expect(result.isRight()).toBeTruthy()
    expect(answersRepository.questions.length).toEqual(1)
    expect(answersRepository.questions[0]).toBe(result.value?.question)
    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.createdAt).toBeTruthy()
    expect(result.value?.question.updatedAt).toBeFalsy()
    expect(result.value?.question.content).toEqual(content)
    expect(result.value?.question.authorId).toEqual(authorId)
    expect(result.value?.question.title).toEqual(title)
    // expect(result.value?.question.attachments).toEqual([
    //   expect.objectContaining({
    //     attachmentId: new UniqueEntityId('attachment id 1'),
    //   }),
    //   expect.objectContaining({
    //     attachmentId: new UniqueEntityId('attachment id 2'),
    //   }),
    // ])
  })
})
