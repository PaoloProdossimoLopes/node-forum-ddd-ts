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

  async findById(id: string): Promise<Question | null> {
    const question = this.questions.find((q) => q.id === id)
    if (!question) return null
    return question
  }

  async delete(id: string): Promise<void> {
    this.questions = this.questions.filter((q) => q.id !== id)
  }

  async save(question: Question): Promise<void> {
    const index = this.questions.findIndex((q) => q.id === question.id)
    this.questions[index] = question
  }
}
