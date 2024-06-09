import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { InMemoryQuestionCommentsRepository } from '../repositories/in-memory-question-comments-repository'
import { InMemmoryQuestionsRepository } from '../repositories/in-memory-questions-repository'
import { FetchCommentsOnQuestionUseCase } from './fetch-comments-on-question'

describe('Fetch question comments', () => {
  let questionRepostiory: InMemmoryQuestionsRepository
  let questionCommentsRepository: InMemoryQuestionCommentsRepository
  let sut: FetchCommentsOnQuestionUseCase

  beforeEach(() => {
    questionRepostiory = new InMemmoryQuestionsRepository()
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchCommentsOnQuestionUseCase(
      questionRepostiory,
      questionCommentsRepository,
    )
  })

  it('should be able to list answers for a question', async () => {
    const authorId = new UniqueEntityId('any author id')
    const question = Question.create({
      authorId,
      content: 'question content',
      title: 'question title',
    })
    const comment1 = QuestionComment.create({
      authorId,
      content: 'any content id',
      questionId: new UniqueEntityId(question.id),
      createdAt: new Date(2020, 0, 28),
    })
    const comment2 = QuestionComment.create({
      authorId,
      content: 'any content id',
      questionId: new UniqueEntityId(question.id),
      createdAt: new Date(2020, 0, 23),
    })
    const comment3 = QuestionComment.create({
      authorId,
      content: 'any content id',
      questionId: new UniqueEntityId(question.id),
      createdAt: new Date(2020, 0, 10),
    })
    questionRepostiory.questions = [question]
    questionCommentsRepository.questionComments = [comment1, comment2, comment3]
    const { comments } = await sut.execute({
      questionId: question.id,
      page: 1,
    })

    expect(comments).toEqual([comment1, comment2, comment3])
  })
})
