import { Either, left, right } from '@/core/either'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { QuestionAttachmentWatchedList } from '../../enterprise/entities/question-attachments-watched-list'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentIds: string[]
}

type Response = Either<ResourceNotFoundError | NotAllowedError, object>

export class EditQuestionUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { authorId, questionId, title, content, attachmentIds } = request

    const question = await this.questionsRepository.findById(questionId)
    if (!question) return left(new ResourceNotFoundError())

    if (question.authorId !== authorId) return left(new NotAllowedError())

    const currentQuestinoAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(question.id)
    const questionAttachmentWatchedList = new QuestionAttachmentWatchedList(
      currentQuestinoAttachments,
    )
    const questionAttachments = attachmentIds.map((id) =>
      QuestionAttachment.create({
        attachmentId: id,
        questionId: question.id,
      }),
    )
    questionAttachmentWatchedList.update(questionAttachments)
    question.attachments = questionAttachmentWatchedList

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)
    return right({})
  }
}
