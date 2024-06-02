import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemmoryQuestionsRepository } from '../repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'

describe('Delete answer', () => {
  it('should be able to delete a answer by id', async () => {
    const question = makeAnyQuestion()
    const questionsRepository = new InMemmoryQuestionsRepository()
    questionsRepository.questions = [question]
    const sut = new DeleteQuestionUseCase(questionsRepository)

    expect(questionsRepository.questions.length).toEqual(1)

    await sut.execute({ questionId: question.id })

    expect(questionsRepository.questions.length).toEqual(0)
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
