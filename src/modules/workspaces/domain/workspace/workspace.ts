import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, right } from '@shared/core/logic/either'

import { Name } from '@shared/domain/name'

interface WorkspaceProperties {
  name: Name
  creator_id: Identifier
}

export class Workspace extends AggregateRoot<WorkspaceProperties> {
  public get name(): Name {
    return this.properties.name
  }

  public set name(name: Name) {
    this.properties.name = name
  }

  public get creator_id(): Identifier {
    return this.properties.creator_id
  }

  private constructor(properties: WorkspaceProperties, id?: Identifier) {
    super(properties, id)
  }

  public static create(properties: WorkspaceProperties, id?: Identifier): Either<Violation[], Workspace> {
    return right(new Workspace({
      name: properties.name,
      creator_id: properties.creator_id
    }))
  }
}
