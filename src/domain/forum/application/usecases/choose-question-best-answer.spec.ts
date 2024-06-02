import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { Question } from '../../enterprise/entities/question'
import { InMemoryAnswersRepository } from '../repositories/in-memory-answers-repository'
import { InMemmoryQuestionsRepository } from '../repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'

describe('Choose question best answer', () => {
  it('should be able to choose best answer', async () => {
    const questionId = new UniqueEntityId('any question id')
    const authorId = new UniqueEntityId('any id')
    const answer = Answer.create({
      authorId,
      questionId,
      content: 'any content',
    })
    const question = Question.create(
      {
        authorId,
        content: 'any content',
        title: 'any title',
        bestAnswerId: new UniqueEntityId(answer.id),
      },
      questionId,
    )
    const questionsRepository = new InMemmoryQuestionsRepository()
    questionsRepository.questions = [question]
    const answersRepository = new InMemoryAnswersRepository()
    answersRepository.answers = [answer]
    const sut = new ChooseQuestionBestAnswerUseCase(
      questionsRepository,
      answersRepository,
    )

    const { question: questionResult } = await sut.execute({
      answerId: answer.id,
      authorId: authorId.toString(),
    })

    expect(questionResult.bestAnswerId?.toString()).toEqual(answer.id)
  })

  it('should not be able to choose best answer if you are not the author', async () => {
    const questionId = new UniqueEntityId('any question id')
    const answer = Answer.create({
      authorId: new UniqueEntityId('any id'),
      questionId,
      content: 'any content',
    })
    const question = Question.create(
      {
        authorId: new UniqueEntityId('other id'),
        content: 'any content',
        title: 'any title',
        bestAnswerId: new UniqueEntityId(answer.id),
      },
      questionId,
    )
    const questionsRepository = new InMemmoryQuestionsRepository()
    questionsRepository.questions = [question]
    const answersRepository = new InMemoryAnswersRepository()
    answersRepository.answers = [answer]
    const sut = new ChooseQuestionBestAnswerUseCase(
      questionsRepository,
      answersRepository,
    )

    expect(async () => {
      await sut.execute({
        answerId: answer.id,
        authorId: answer.id.toString(),
      })
    }).rejects.toThrowError()
  })
})
