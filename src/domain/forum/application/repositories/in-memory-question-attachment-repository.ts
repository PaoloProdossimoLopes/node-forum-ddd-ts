import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { QuestionAttachmentsRepository } from './question-attachments-repository'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  questionAttachments: QuestionAttachment[] = []

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    return this.questionAttachments.filter(
      (item) => item.questionId === questionId,
    )
  }
}
