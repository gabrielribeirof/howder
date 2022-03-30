import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Guard } from '@shared/core/logic/guard'
import { Either, right, left } from '@shared/core/logic/either'

import { RequiredViolation } from '@shared/errors/violations/required.violation'

interface MemberProperties {
  agent_id: Identifier
  workspace_id: Identifier
  is_admin: boolean
}

export class Member extends AggregateRoot<MemberProperties> {
  public get agent_id(): Identifier {
    return this.properties.agent_id
  }

  public get workspace_id(): Identifier {
    return this.properties.workspace_id
  }

  public get is_admin(): boolean {
    return this.properties.is_admin
  }

  private constructor(properties: MemberProperties, id?: Identifier) {
    super(properties, id)
  }

  public static create(properties: MemberProperties, id?: Identifier): Either<Violation[], Member> {
    if (Guard.againstNullOrUndefined(properties.is_admin).fail) {
      return left([new RequiredViolation('is_admin', String(properties.is_admin))])
    }

    return right(new Member({
      agent_id: properties.agent_id,
      workspace_id: properties.workspace_id,
      is_admin: properties.is_admin
    }, id))
  }
}
