import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { QuestionAttachmentWatchedList } from './question-attachments-watched-list'
import { Slug } from './value-objects/slug'

interface QuestionProps {
  slug: Slug
  title: string
  content: string
  attachments: QuestionAttachmentWatchedList
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        attachments: props.attachments ?? new QuestionAttachmentWatchedList(),
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )
    return question
  }

  get slug() {
    return this.props.slug.value
  }

  get title() {
    return this.props.title
  }

  set title(newTitle: string) {
    this.props.title = newTitle
    this.props.slug = Slug.createFromText(newTitle)
    this.props.updatedAt = new Date()
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

  set attachments(newAttachments: QuestionAttachmentWatchedList) {
    this.props.attachments = newAttachments
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  set bestAnswerId(id: UniqueEntityId | undefined) {
    this.props.bestAnswerId = id
    this.props.updatedAt = new Date()
  }

  get authorId() {
    return this.props.authorId.toString()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
