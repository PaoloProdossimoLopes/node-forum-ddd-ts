import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { AnswerAttachmentWatchedList } from './answer-attachment-watched-list'

interface AnswerProps {
  content: string
  attachments: AnswerAttachmentWatchedList
  questionId: UniqueEntityId
  authorId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  static create(
    props: Optional<AnswerProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentWatchedList([]),
        createdAt: new Date(),
      },
      id,
    )
    return answer
  }

  get content() {
    return this.props.content
  }

  set content(newContent: string) {
    this.props.content = newContent
    this.props.updatedAt = new Date()
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(newAttachments: AnswerAttachmentWatchedList) {
    this.props.attachments = newAttachments
  }

  get questionId() {
    return this.props.questionId.toString()
  }

  get authorId() {
    return this.props.authorId.toString()
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get createdAt() {
    return this.props.createdAt
  }
}
