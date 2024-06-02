import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemmoryQuestionsRepository } from '../repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'

describe('Edit question', () => {
  it('should be able to edit a question by id', async () => {
    const newTitle = 'new title'
    const newContent = 'new content'
    const question = makeAnyQuestion()
    const questionsRepository = new InMemmoryQuestionsRepository()
    questionsRepository.questions = [question]
    const sut = new EditQuestionUseCase(questionsRepository)

    await sut.execute({
      questionId: question.id,
      authorId: question.authorId,
      title: newTitle,
      content: newContent,
    })

    expect(questionsRepository.questions[0].title).toEqual(newTitle)
    expect(questionsRepository.questions[0].content).toEqual(newContent)
    expect(questionsRepository.questions[0].authorId).toEqual(question.authorId)
  })

  it('should not be able to edit a question by id if its not author', async () => {
    const question = makeAnyQuestion()
    const questionsRepository = new InMemmoryQuestionsRepository()
    questionsRepository.questions = [question]
    const sut = new EditQuestionUseCase(questionsRepository)

    expect(async () => {
      await sut.execute({
        questionId: question.id,
        authorId: 'other author id',
        title: 'new title',
        content: 'new content',
      })
    }).rejects.toThrowError()
  })
})

function makeAnyQuestion() {
  return Question.create(
    {
      authorId: new UniqueEntityId('any author id'),
      content: 'any content',
      title: 'any title',
      bestAnswerId: new UniqueEntityId('any best id'),
      slug: new Slug('any-slug'),
    },
    new UniqueEntityId('any id'),
  )
}
