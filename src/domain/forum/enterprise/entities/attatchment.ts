import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface AttatchmentProps {
  title: string
  link: string
}

export class Attatchment extends Entity<AttatchmentProps> {
  get title() {
    return this.props.title
  }

  get lint() {
    return this.props.link
  }

  static create(props: AttatchmentProps, id?: UniqueEntityId) {
    return new Attatchment(props, id)
  }
}
