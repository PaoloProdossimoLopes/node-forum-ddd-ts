import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from './answer-comments-repository'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  answerComments: AnswerComment[] = []

  async create(questionComment: AnswerComment): Promise<void> {
    this.answerComments.push(questionComment)
  }
}
