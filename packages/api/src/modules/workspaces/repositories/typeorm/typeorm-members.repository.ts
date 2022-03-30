import { Repository, getRepository } from 'typeorm'

import { Member } from '@modules/workspaces/domain/member/member'
import { MemberMapper } from '@modules/workspaces/mappers/member.mapper'
import { MemberEntity } from '@shared/infra/typeorm/entities/member.entity'
import { IMembersRepository } from '../imembers.repository'

export class TypeORMMembersRespository implements IMembersRepository {
  private ormRepository: Repository<MemberEntity>

  constructor() {
    this.ormRepository = getRepository(MemberEntity)
  }

  public async findById(id: string): Promise<Member | undefined> {
    const member = await this.ormRepository.findOne(id)

    return member && MemberMapper.toDomain(member)
  }

  public async findByWorkspaceId(workspace_id: string): Promise<Member[] | undefined> {
    const members = await this.ormRepository.find({
      where: { workspace_id }
    })

    return members && members.map(m => MemberMapper.toDomain(m))
  }

  public async findByWorkspaceIdAndAgentId(workspace_id: string, agent_id: string): Promise<Member | undefined> {
    const member = await this.ormRepository.findOne({
      where: {
        workspace_id,
        agent_id
      }
    })

    return member && MemberMapper.toDomain(member)
  }

  public async save(member: Member): Promise<void> {
    await this.ormRepository.save(MemberMapper.toPersistence(member))
  }

  public async delete(member: Member): Promise<void> {
    await this.ormRepository.delete({ id: member.id.value })
  }
}
