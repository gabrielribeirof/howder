import { Workspace } from '@modules/workspaces/domain/workspace/workspace'
import { createWorkspace } from '@modules/workspaces/domain/workspace/factories/workspace.factory'

type WorkspaceOverrides = {
  name?: string
  creator_id?: string
}

export function makeWorkspace(overrides?: WorkspaceOverrides): Workspace {
  const workspace = createWorkspace({
    name: overrides?.name ?? 'Workspace Test Name',
    creator_id: overrides?.creator_id ?? 'creator-agent-id'
  })

  if (workspace.isLeft()) throw new Error()

  return workspace.value
}
