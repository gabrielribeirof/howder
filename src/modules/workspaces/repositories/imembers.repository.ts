import { Member } from '../domain/member/member'

export interface IMembersRepository {
  findById(id: string): Promise<Member | undefined>
  findByWorkspaceId(workspace_id: string): Promise<Member[] | undefined>
  findByWorkspaceIdAndAgentId(workspace_id: string, agent_id: string): Promise<Member | undefined>
  save(member: Member): Promise<void>
  delete(member: Member): Promise<void>
}
