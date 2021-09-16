import { Identifier } from './identifier'

export abstract class Entity<T> {
  readonly id: Identifier
  readonly props: T

  constructor(props: T, id?: Identifier) {
    this.id = id || new Identifier()
    this.props = props
  }

  public equals(entity: Entity<T>): boolean {
    if (this === entity) {
      return true
    }

    return this.id.equals(entity.id)
  }
}