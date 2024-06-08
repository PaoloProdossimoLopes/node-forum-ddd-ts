import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  static create(props: Optional<AnswerCommentProps, 'createdAt'>) {
    const answer = new AnswerComment({
      ...props,
      createdAt: new Date(),
    })
    return answer
  }

  get answerId() {
    return this.props.answerId.toString()
  }
}
