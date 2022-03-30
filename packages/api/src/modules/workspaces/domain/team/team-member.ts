import { ValueObject } from '@shared/core/domain/value-object'
import { Identifier } from '@shared/core/domain/identifier'

interface TeamMemberProperties {
  member_id: Identifier
}

export class TeamMember extends ValueObject<TeamMemberProperties> {
  public get member_id(): Identifier {
    return this.properties.member_id
  }

  private constructor(properties: TeamMemberProperties) {
    super(properties)
  }

  public static create(properties: TeamMemberProperties): TeamMember {
    return new TeamMember({ member_id: properties.member_id })
  }
}
