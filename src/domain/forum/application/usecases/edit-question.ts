import { QuestionsRepository } from '../repositories/questions-repository'

interface Request {
  authorId: string
  questionId: string
  title: string
  content: string
}

type Response = void

export class EditQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute(request: Request): Promise<Response> {
    const { authorId, questionId, title, content } = request

    const question = await this.questionsRepository.findById(questionId)
    if (!question) throw new Error('Question not found')

    if (question.authorId !== authorId) throw new Error('not allowed')

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)
  }
}
