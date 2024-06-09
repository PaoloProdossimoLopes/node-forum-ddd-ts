import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { InMemoryAnswerCommentsRepository } from '../repositories/in-memory-answers-comments-repository'
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository'
import { FetchCommentsOnAnswerUseCase } from './fetch-comments-on-answer'

describe('Fetch answer comments', () => {
  let answerRepostiory: InMemoryAnswersRepository
  let answersRepository: InMemoryAnswerCommentsRepository
  let sut: FetchCommentsOnAnswerUseCase

  beforeEach(() => {
    answerRepostiory = new InMemoryAnswersRepository()
    answersRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchCommentsOnAnswerUseCase(answerRepostiory, answersRepository)
  })

  it('should be able to list answers for a answer', async () => {
    const answer = Answer.create({
      authorId: new UniqueEntityId('author-id'),
      questionId: new UniqueEntityId('question-id'),
      content: 'content',
    })
    const comment1 = AnswerComment.create({
      authorId: new UniqueEntityId('any author id'),
      content: 'any content id',
      answerId: new UniqueEntityId(answer.id),
      createdAt: new Date(2020, 0, 28),
    })
    const comment2 = AnswerComment.create({
      authorId: new UniqueEntityId('any author id'),
      content: 'any content id',
      answerId: new UniqueEntityId(answer.id),
      createdAt: new Date(2020, 0, 23),
    })
    const comment3 = AnswerComment.create({
      authorId: new UniqueEntityId('any author id'),
      content: 'any content id',
      answerId: new UniqueEntityId(answer.id),
      createdAt: new Date(2020, 0, 10),
    })
    answerRepostiory.answers = [answer]
    answersRepository.answerComments = [comment1, comment2, comment3]
    const result = await sut.execute({
      answerId: answer.id,
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.comments).toEqual([comment1, comment2, comment3])
  })
})
