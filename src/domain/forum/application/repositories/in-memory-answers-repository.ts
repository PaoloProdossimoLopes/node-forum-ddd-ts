import { PaginationParam } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from './answers-repository'

export class InMemoryAnswersRepository implements AnswersRepository {
  answers: Answer[] = []

  async create(answer: Answer) {
    this.answers.push(answer)
  }

  async save(answer: Answer): Promise<void> {
    const index = this.answers.findIndex((a) => a.id === answer.id)
    this.answers[index] = answer
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.answers.findIndex((a) => a.id === answer.id)
    this.answers.splice(index, 1)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.answers.find((a) => a.id === id)
    if (!answer) return null
    return answer
  }

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParam,
  ): Promise<Answer[]> {
    const { page } = params
    return this.answers
      .filter((a) => a.questionId === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }
}
