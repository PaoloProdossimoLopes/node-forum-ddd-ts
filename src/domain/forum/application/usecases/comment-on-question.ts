import { Either, left, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface Request {
  authorId: string
  questionId: string
  content: string
}

type Response = Either<
  ResourceNotFoundError,
  {
    comment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { authorId, content, questionId } = request

    const question = await this.questionsRepository.findById(questionId)
    if (!question) return left(new ResourceNotFoundError())

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({ comment: questionComment })
  }
}
