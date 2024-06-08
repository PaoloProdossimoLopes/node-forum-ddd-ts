import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from './question-comments-repository'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  questionComments: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.questionComments.push(questionComment)
  }
}
