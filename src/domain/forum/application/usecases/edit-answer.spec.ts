import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'

describe('Edit answer', () => {
  it('should be able to edit a answer by id', async () => {
    const newContent = 'new content'
    const answer = makeAnyAnswer()
    const answersRepository = new InMemoryAnswersRepository()
    answersRepository.answers = [answer]
    const sut = new EditAnswerUseCase(answersRepository)

    await sut.execute({
      answerId: answer.id,
      authorId: answer.authorId,
      content: newContent,
    })

    expect(answersRepository.answers[0].content).toEqual(newContent)
    expect(answersRepository.answers[0].authorId).toEqual(answer.authorId)
    expect(answersRepository.answers[0].excerpt).toEqual(answer.excerpt)
    expect(answersRepository.answers[0].id).toEqual(answer.id)
  })

  it('should not be able to edit a answer by id if its not author', async () => {
    const answer = makeAnyAnswer()
    const answersRepository = new InMemoryAnswersRepository()
    answersRepository.answers = [answer]
    const sut = new EditAnswerUseCase(answersRepository)

    const result = await sut.execute({
      answerId: answer.id,
      authorId: 'other author id',
      content: 'new content',
    })

    expect(result.isLeft()).toBeTruthy()
  })
})

function makeAnyAnswer() {
  return Answer.create({
    authorId: new UniqueEntityId('any author id'),
    content: 'any content',
    questionId: new UniqueEntityId('any question id'),
  })
}
