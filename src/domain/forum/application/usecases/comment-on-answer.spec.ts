import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { InMemoryAnswerCommentsRepository } from '../repositories/in-memory-answers-comments-repository'
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

describe('Comment on Answer', () => {
  it('should be able to comment on answer', async () => {
    const questionId = 'any question id'
    const answerId = 'any question id'
    const authorId = 'any id'
    const question = Answer.create(
      {
        authorId: new UniqueEntityId(authorId),
        content: 'any content',
        questionId: new UniqueEntityId(questionId),
      },
      new UniqueEntityId(answerId),
    )
    const ansewrsRepository = new InMemoryAnswersRepository()
    ansewrsRepository.answers = [question]
    const answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    const sut = new CommentOnAnswerUseCase(
      ansewrsRepository,
      answerCommentsRepository,
    )

    const content = 'any content'
    const result = await sut.execute({
      authorId: authorId.toString(),
      content,
      answerId,
    })

    expect(result.isRight()).toBeTruthy()
    expect(answerCommentsRepository.answerComments.length).toEqual(1)
    expect(answerCommentsRepository.answerComments[0]).toEqual(
      result.value?.comment,
    )
  })
})
