import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, right } from '@shared/core/logic/either'

import { Name } from '@shared/domain/name'

interface TagProperties {
  name: Name
  creator_id: Identifier
  workspace_id: Identifier
}

export class Tag extends AggregateRoot<TagProperties> {
  public get name(): Name {
    return this.properties.name
  }

  public set name(name: Name) {
    this.properties.name = name
  }

  public get creator_id(): Identifier {
    return this.properties.creator_id
  }

  public get workspace_id(): Identifier {
    return this.properties.workspace_id
  }

  private constructor(properties: TagProperties, id?: Identifier) {
    super(properties, id)
  }

  public changeName(properties: TagProperties): void {
    this.properties.name = properties.name
    this.properties.creator_id = properties.creator_id
  }

  public static create(properties: TagProperties, id?: Identifier): Either<Violation[], Tag> {
    return right(new Tag({
      name: properties.name,
      creator_id: properties.creator_id,
      workspace_id: properties.workspace_id
    }, id))
  }
}
