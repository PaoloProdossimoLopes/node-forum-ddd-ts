import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { InMemoryQuestionCommentsRepository } from '../repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'

describe('Delete answer comment', () => {
  it('should be able to delete a answer comment by id', async () => {
    const comment = QuestionComment.create({
      authorId: new UniqueEntityId('author-id'),
      questionId: new UniqueEntityId('question-id'),
      content: 'content',
    })
    const repository = new InMemoryQuestionCommentsRepository()
    repository.questionComments = [comment]
    const sut = new DeleteQuestionCommentUseCase(repository)

    await sut.execute({ questionCommentId: comment.id })

    expect(repository.questionComments.length).toEqual(0)
  })

  it('should not be able to delete a answer comment by id when question not finded', async () => {
    const commentId = 'comment-id'
    const repository = new InMemoryQuestionCommentsRepository()
    const sut = new DeleteQuestionCommentUseCase(repository)

    const result = await sut.execute({ questionCommentId: commentId })

    expect(result.isLeft()).toBeTruthy()
  })
})
