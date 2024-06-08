import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { InMemoryQuestionCommentsRepository } from '../repositories/in-memory-question-comments-repository'
import { InMemmoryQuestionsRepository } from '../repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

describe('Choose question best answer', () => {
  it('should be able to choose best answer', async () => {
    const questionId = 'any question id'
    const authorId = 'any id'
    const question = Question.create(
      {
        authorId: new UniqueEntityId(authorId),
        content: 'any content',
        title: 'any title',
      },
      new UniqueEntityId(questionId),
    )
    const questionsRepository = new InMemmoryQuestionsRepository()
    questionsRepository.questions = [question]
    const questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    const sut = new CommentOnQuestionUseCase(
      questionsRepository,
      questionCommentsRepository,
    )

    const content = 'any content'
    const { comment } = await sut.execute({
      authorId: authorId.toString(),
      content,
      questionId,
    })

    expect(questionCommentsRepository.questionComments.length).toEqual(1)
    expect(questionCommentsRepository.questionComments[0]).toEqual(comment)
  })
})
