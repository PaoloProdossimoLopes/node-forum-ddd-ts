import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/domain/forum/application/usecases/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/domain/forum/application/usecases/errors/resource-not-found-error'
import { Notification } from '../../enterprise/entities/notification'
import { InMemoryNotificationsRepository } from '../repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'

describe('read notification', () => {
  it('should not be able to read a unexsist notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sut = new ReadNotificationUseCase(notificationsRepository)
    notificationsRepository.notifications = []

    const result = await sut.execute({
      notificationId: 'any notification id',
      recipientId: 'any recipient id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to read a if reader is not the notification recipient', async () => {
    const notificationId = 'any notification id'
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sut = new ReadNotificationUseCase(notificationsRepository)
    notificationsRepository.notifications = [
      Notification.create(
        {
          content: 'any content',
          reciepientId: 'any recipient id',
          title: 'any title',
        },
        new UniqueEntityId(notificationId),
      ),
    ]

    const result = await sut.execute({
      notificationId,
      recipientId: 'any other recipient id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should should be able to read a notification', async () => {
    const notification = Notification.create({
      content: 'any content',
      reciepientId: 'any recipient id',
      title: 'any title',
    })
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sut = new ReadNotificationUseCase(notificationsRepository)
    notificationsRepository.notifications = [notification]

    const result = await sut.execute({
      notificationId: notification.id,
      recipientId: notification.reciepientId,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.notification).toEqual(notification)
  })
})
