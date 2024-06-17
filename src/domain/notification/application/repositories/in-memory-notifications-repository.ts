import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from './notifications-repository'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  notifications: Notification[] = []
  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.notifications.find((q) => q.id === id)
    if (!notification) return null
    return notification
  }

  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex((q) => q.id === notification.id)
    this.notifications[index] = notification
  }
}
