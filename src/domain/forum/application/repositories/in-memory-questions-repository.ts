import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from './questions-repository'

export class InMemmoryQuestionsRepository implements QuestionsRepository {
  questions: Question[] = []

  async create(question: Question) {
    this.questions.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find((q) => q.slug === slug)
    if (!question) return null
    return question
  }

  async delete(id: string): Promise<void> {
    this.questions = this.questions.filter((q) => q.id !== id)
  }
}
