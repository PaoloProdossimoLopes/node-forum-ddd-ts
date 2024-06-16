import { Either, left, right } from '@/core/either'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentWatchedList } from '../../enterprise/entities/answer-attachment-watched-list'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  authorId: string
  answerId: string
  content: string
  attachmentIds: string[]
}

type Response = Either<ResourceNotFoundError | NotAllowedError, object>

export class EditAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { authorId, answerId, content, attachmentIds } = request

    const answer = await this.answersRepository.findById(answerId)
    if (!answer) return left(new NotAllowedError())

    if (answer.authorId !== authorId) return left(new NotAllowedError())

    const currentQuestinoAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answer.id)
    const answerAttachmentWatchedList = new AnswerAttachmentWatchedList(
      currentQuestinoAttachments,
    )
    const answerAttachments = attachmentIds.map((id) =>
      AnswerAttachment.create({
        attachmentId: id,
        answerId: answer.id,
      }),
    )
    answerAttachmentWatchedList.update(answerAttachments)
    answer.attachments = answerAttachmentWatchedList

    answer.content = content

    await this.answersRepository.save(answer)
    return right({})
  }
}
