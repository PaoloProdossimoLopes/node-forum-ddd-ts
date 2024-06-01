import { UniqueEntityId } from './unique-entity-id'

export class Entity<Props> {
  private identifier: UniqueEntityId
  protected props: Props

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props
    this.identifier = id ?? new UniqueEntityId()
  }

  get id() {
    return this.identifier.toString()
  }
}
