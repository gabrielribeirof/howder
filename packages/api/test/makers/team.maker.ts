import { Team } from '@modules/workspaces/domain/team/team'
import { createTeam } from '@modules/workspaces/domain/team/factories/team.factory'

type TeamOverrides = {
  name?: string
  creator_id?: string
  workspace_id?: string
}

export function makeTeam(overrides?: TeamOverrides): Team {
  const team = createTeam({
    name: overrides?.name ?? 'Team TestName',
    creator_id: overrides?.creator_id ?? 'creator-id',
    workspace_id: overrides?.workspace_id ?? 'workspace-id'
  })

  if (team.isLeft()) throw new Error()

  return team.value
}
