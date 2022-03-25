export type WorkspaceWithDetails = {
  name: string
  creator_id: string
  members: Array<{
    agent_id: string
    workspace_id: string
    is_admin: boolean
  }>
  teams: Array<{
    name: string
    creator_id: string
    workspace_id: string
    members_id: string[]
  }>
  tags: Array<{
    name: string
    creator_id: string
    workspace_id: string
  }>
}
