import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<T> {
  protected readonly id: UniqueEntityID
  readonly props: T

  constructor(props: T, id?: UniqueEntityID) {
    this.id = id || new UniqueEntityID()
    this.props = props
  }

  public equals(entity: Entity<T>): boolean {
    if (this === entity) {
      return true
    }

    return this.id.equals(entity.id)
  }
}
