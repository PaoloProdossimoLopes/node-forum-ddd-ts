import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemmoryQuestionsRepository } from '../repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

describe('Get question by slug', () => {
  it('should be able to get question by slug', async () => {
    const id = new UniqueEntityId('any unique id')
    const slug = new Slug('any slug')
    const authorId = new UniqueEntityId('any author id')
    const content = 'any content'
    const title = 'any title'
    const bestAnswerId = new UniqueEntityId('best answer id')
    const createdAt = new Date()
    const updatedAt = new Date()
    const questionsRepository = new InMemmoryQuestionsRepository()
    questionsRepository.questions = [
      Question.create(
        {
          authorId,
          content,
          title,
          bestAnswerId,
          createdAt,
          slug,
          updatedAt,
        },
        id,
      ),
    ]
    const sut = new GetQuestionBySlugUseCase(questionsRepository)

    const result = await sut.execute({ slug: slug.value })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.question.id).toEqual(id.toString())
    expect(result.value?.question.authorId).toEqual(authorId.toString())
    expect(result.value?.question.createdAt).toEqual(createdAt)
    expect(result.value?.question.content).toEqual(content)
    expect(result.value?.question.slug).toEqual(slug.value)
    expect(result.value?.question.title).toEqual(title)
    expect(result.value?.question.updatedAt).toEqual(updatedAt)
    expect(result.value?.question.bestAnswerId?.toString()).toEqual(
      bestAnswerId.toString(),
    )
  })
})
