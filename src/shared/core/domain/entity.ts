import { Identifier } from './identifier'

export abstract class Entity<Properties> {
  public readonly id: Identifier
  protected readonly properties: Properties

  constructor(properties: Properties, id?: Identifier) {
    this.id = id || new Identifier()
    this.properties = properties
  }

  public equals(entity: Entity<Properties>): boolean {
    if (this === entity) {
      return true
    }

    return this.id.equals(entity.id)
  }
}
