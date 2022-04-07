import { Member } from '@modules/workspaces/domain/member/member'
import { createMember } from '@modules/workspaces/domain/member/factories/member.factory'

type MemberOverrides = {
  agent_id?: string
  workspace_id?: string
  is_admin?: boolean
}

export function makeMember(overrides?: MemberOverrides): Member {
  const member = createMember({
    agent_id: overrides?.agent_id ?? 'agent-id',
    workspace_id: overrides?.workspace_id ?? 'workspace-id',
    is_admin: overrides?.is_admin
  })

  if (member.isLeft()) throw new Error()

  return member.value
}
