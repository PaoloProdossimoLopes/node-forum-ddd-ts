import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/domain/forum/application/usecases/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/domain/forum/application/usecases/errors/resource-not-found-error'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'

interface Request {
  notificationId: string
  recipientId: string
}

type Response = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { recipientId, notificationId } = request

    const notification =
      await this.notificationsRepository.findById(notificationId)
    if (!notification) return left(new ResourceNotFoundError())

    if (notification.reciepientId !== recipientId)
      return left(new NotAllowedError())

    notification.read()

    await this.notificationsRepository.save(notification)

    return right({ notification })
  }
}
