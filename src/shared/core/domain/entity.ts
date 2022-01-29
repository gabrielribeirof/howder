import { Identifier } from './identifier'

export abstract class Entity<Properties> {
  public readonly id: Identifier

  constructor(id?: Identifier) {
    this.id = id || new Identifier()
  }

  public equals(entity: Entity<Properties>): boolean {
    if (this === entity) {
      return true
    }

    return this.id.equals(entity.id)
  }
}
