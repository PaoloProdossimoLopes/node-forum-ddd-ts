import { Either, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notifications-repository'

interface Request {
  title: string
  content: string
  recipientId: string
}

type Response = Either<
  void,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { recipientId, title, content } = request
    const notification = Notification.create({
      reciepientId: recipientId,
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }
}
