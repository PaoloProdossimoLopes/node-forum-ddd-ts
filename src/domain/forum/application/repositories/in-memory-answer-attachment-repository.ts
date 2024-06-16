import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentsRepository } from './answer-attachments-repository'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  questionAttachments: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    return this.questionAttachments.filter((item) => item.answerId === answerId)
  }
}
