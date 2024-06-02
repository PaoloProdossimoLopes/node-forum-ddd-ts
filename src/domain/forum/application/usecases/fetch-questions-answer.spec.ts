import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-questions-answer'

describe('Fetch question answers', () => {
  let answersRepository: InMemoryAnswersRepository
  let sut: FetchQuestionAnswersUseCase

  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(answersRepository)
  })

  it('should be able to list answers for a question', async () => {
    const questionId = new UniqueEntityId('any question id')
    const a1 = Answer.create({
      authorId: new UniqueEntityId('any author id'),
      content: 'any content id',
      questionId,
      createdAt: new Date(2020, 0, 28),
    })
    const a2 = Answer.create({
      authorId: new UniqueEntityId('any author id'),
      content: 'any content id',
      questionId,
      createdAt: new Date(2020, 0, 23),
    })
    const a3 = Answer.create({
      authorId: new UniqueEntityId('any author id'),
      content: 'any content id',
      questionId,
      createdAt: new Date(2020, 0, 10),
    })
    answersRepository.answers = [a1, a2, a3]
    const { answers } = await sut.execute({
      questionId: questionId.toString(),
      page: 1,
    })

    expect(answers).toEqual([a1, a2, a3])
  })
})
