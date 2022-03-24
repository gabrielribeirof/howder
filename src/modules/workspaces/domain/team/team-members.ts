import { WatchedList } from '@shared/core/domain/watched-list'

import { TeamMember } from './team-member'

export class TeamMembers extends WatchedList<TeamMember> {
  private constructor(chats: TeamMember[]) {
    super(chats)
  }

  public compareItems(a: TeamMember, b: TeamMember): boolean {
    return a.equals(b)
  }

  public static create(teamMembers?: TeamMember[]): TeamMembers {
    return new TeamMembers(teamMembers || [])
  }
}
