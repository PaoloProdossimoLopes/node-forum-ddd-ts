import { PaginationParam } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from './answer-comments-repository'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  answerComments: AnswerComment[] = []

  async findById(id: string): Promise<AnswerComment | null> {
    const answer = this.answerComments.find((a) => a.id === id)
    if (!answer) return null
    return answer
  }

  async create(questionComment: AnswerComment): Promise<void> {
    this.answerComments.push(questionComment)
  }

  async delete(comment: AnswerComment): Promise<void> {
    const index = this.answerComments.findIndex((a) => a.id === comment.id)
    this.answerComments.splice(index, 1)
  }

  async findMany({ page }: PaginationParam): Promise<AnswerComment[]> {
    return this.answerComments
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }
}
