import { PaginationParam } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  findById(id: string): Promise<QuestionComment | null>
  create(comment: QuestionComment): Promise<void>
  delete(answerComment: QuestionComment): Promise<void>
  findMany(params: PaginationParam): Promise<QuestionComment[]>
}
