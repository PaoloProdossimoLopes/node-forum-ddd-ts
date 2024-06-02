import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'

interface AnswerProps {
  content: string
  questionId: UniqueEntityId
  authorId: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  static create(props: Optional<AnswerProps, 'createdAt'>) {
    const answer = new Answer({
      ...props,
      createdAt: new Date(),
    })
    return answer
  }

  get content() {
    return this.props.content
  }

  set content(newContent: string) {
    this.props.content = newContent
    this.props.updatedAt = new Date()
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
