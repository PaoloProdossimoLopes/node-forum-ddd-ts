import { Either, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { QuestionAttachmentWatchedList } from '../../enterprise/entities/question-attachments-watched-list'
import { QuestionsRepository } from '../repositories/questions-repository'

interface Request {
  authorId: string
  title: string
  content: string
  attachmentIds: string[]
}

type Response = Either<
  void,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { authorId, title, content, attachmentIds } = request
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })

    question.attachments = new QuestionAttachmentWatchedList(
      attachmentIds.map((id) =>
        QuestionAttachment.create({
          attachmentId: id,
          questionId: question.id,
        }),
      ),
    )

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
