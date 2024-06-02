import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from './answers-repository'

export class InMemoryAnswersRepository implements AnswersRepository {
  answers: Answer[] = []

  async create(answer: Answer) {
    this.answers.push(answer)
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
}
