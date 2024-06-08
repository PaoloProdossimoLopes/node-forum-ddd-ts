import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface CommentProps {
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export abstract class Comment<
  Props extends CommentProps,
> extends Entity<Props> {
  get content() {
    return this.props.content
  }

  set content(newContent: string) {
    this.props.content = newContent
    this.props.updatedAt = new Date()
  }

  get authorId() {
    return this.props.authorId.toString()
  }

  get createdAt() {
    return this.props.createdAt
  }
}
