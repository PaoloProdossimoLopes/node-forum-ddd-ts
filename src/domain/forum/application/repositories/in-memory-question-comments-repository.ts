import { PaginationParam } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from './question-comments-repository'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  questionComments: QuestionComment[] = []

  async findById(id: string): Promise<QuestionComment | null> {
    const answer = this.questionComments.find((a) => a.id === id)
    if (!answer) return null
    return answer
  }

  async create(comment: QuestionComment): Promise<void> {
    this.questionComments.push(comment)
  }

  async delete(comment: QuestionComment): Promise<void> {
    const index = this.questionComments.findIndex((a) => a.id === comment.id)
    this.questionComments.splice(index, 1)
  }

  async findMany({ page }: PaginationParam): Promise<QuestionComment[]> {
    return this.questionComments
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }
}
