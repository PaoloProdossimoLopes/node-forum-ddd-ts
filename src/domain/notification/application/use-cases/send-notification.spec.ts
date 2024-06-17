import { InMemoryNotificationsRepository } from '../repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification'

describe('send notification', () => {
  it('should be able to create a question', async () => {
    const recipientId = 'any author id'
    const content = 'any content'
    const title = 'any title id'
    const repository = new InMemoryNotificationsRepository()
    const sut = new SendNotificationUseCase(repository)

    const result = await sut.execute({
      recipientId,
      content,
      title,
    })

    expect(result.isRight()).toBeTruthy()
    expect(repository.notifications.length).toEqual(1)
    expect(repository.notifications[0]).toBe(result.value?.notification)
    expect(result.value?.notification.id).toBeTruthy()
    expect(result.value?.notification.createdAt).toBeTruthy()
    expect(result.value?.notification.content).toEqual(content)
    expect(result.value?.notification.reciepientId).toEqual(recipientId)
    expect(result.value?.notification.title).toEqual(title)
    // expect(result.value?.question.attachments).toEqual([
    //   expect.objectContaining({
    //     attachmentId: new UniqueEntityId('attachment id 1'),
    //   }),
    //   expect.objectContaining({
    //     attachmentId: new UniqueEntityId('attachment id 2'),
    //   }),
    // ])
  })
})
