import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, left, right } from '@shared/core/logic/either'

import { TeamData } from './team-data'
import { TeamName } from './team-name'

export interface TeamProperties {
  name: TeamName
}

export class Team extends AggregateRoot<TeamProperties> {
  public get name(): TeamName {
    return this.properties.name
  }

  private constructor(properties: TeamProperties, id?: Identifier) {
    super(properties, id)
  }

  public static create(props: TeamData, id?: Identifier): Either<Violation[], Team> {
    const nameResult = TeamName.create(props.name)

    if (nameResult.isLeft()) {
      return left([nameResult.value])
    }

    return right(new Team({
      name: nameResult.value
    }, id))
  }
}
