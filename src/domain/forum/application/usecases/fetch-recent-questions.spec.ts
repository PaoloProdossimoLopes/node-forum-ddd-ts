import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { InMemmoryQuestionsRepository } from '../repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

describe('Fetch recet question', () => {
  let questionsRepository: InMemmoryQuestionsRepository
  let sut: FetchRecentQuestionsUseCase

  beforeEach(() => {
    questionsRepository = new InMemmoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(questionsRepository)
  })

  it('should be able to list answers for a question', async () => {
    const questionId = new UniqueEntityId('any question id')
    const q1 = Question.create(
      {
        authorId: new UniqueEntityId('any author id'),
        content: 'any content id',
        createdAt: new Date(2020, 0, 28),
        title: 'any title',
      },
      questionId,
    )
    const q2 = Question.create(
      {
        authorId: new UniqueEntityId('any author id'),
        content: 'any content id',
        createdAt: new Date(2020, 0, 23),
        title: 'any title',
      },
      questionId,
    )
    const q3 = Question.create(
      {
        authorId: new UniqueEntityId('any author id'),
        content: 'any content id',
        createdAt: new Date(2020, 0, 10),
        title: 'any title',
      },
      questionId,
    )
    questionsRepository.questions = [q3, q2, q1]
    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.questions).toEqual([q1, q2, q3])
  })
})
