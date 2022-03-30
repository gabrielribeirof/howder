import { Member } from '@modules/workspaces/domain/member/member'
import { IMembersRepository } from '../imembers.repository'

export class InMemoryMembersRespository implements IMembersRepository {
  public members: Member[] = []

  public async findById(id: string): Promise<Member | undefined> {
    return this.members.find(arrayMember => arrayMember.id.value === id)
  }

  public async findByWorkspaceId(workspace_id: string): Promise<Member[] | undefined> {
    return this.members.filter(arrayMember => arrayMember.workspace_id.value === workspace_id)
  }

  public async findByWorkspaceIdAndAgentId(workspace_id: string, agent_id: string): Promise<Member | undefined> {
    return this.members.find(arrayMember => arrayMember.workspace_id.value === workspace_id && arrayMember.agent_id.value === agent_id)
  }

  public async save(member: Member): Promise<void> {
    const index = this.members.findIndex(arrayMember => arrayMember.id.equals(member.id))

    if (index >= 0) {
      this.members[index] = member
      return
    }

    this.members.push(member)
  }

  public async delete(member: Member): Promise<void> {
    const index = this.members.findIndex(arrayMember => arrayMember.id.equals(member.id))

    this.members.splice(index, 1)
  }
}
