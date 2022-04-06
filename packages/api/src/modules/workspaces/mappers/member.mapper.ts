import { Member } from '../domain/member/member'
import { MemberDTO } from '../dtos/member.dto'
import { MemberEntity } from '@infra/typeorm/entities/member.entity'
import { createMember } from '../domain/member/factories/member.factory'

export class MemberMapper {
  public static toDTO(member: Member): MemberDTO {
    return {
      id: member.id.value,
      agent_id: member.agent_id.value,
      workspace_id: member.workspace_id.value,
      is_admin: member.is_admin
    }
  }

  public static toDomain(member: MemberEntity): Member {
    const result = createMember({
      id: member.id,
      agent_id: member.agent_id,
      workspace_id: member.workspace_id,
      is_admin: member.is_admin
    })

    if (result.isLeft()) throw new Error('Error on MemberMapper.toDomain()')

    return result.value
  }

  public static toPersistence(member: Member): MemberEntity {
    const m = new MemberEntity()

    m.id = member.id.value
    m.agent_id = member.agent_id.value
    m.workspace_id = member.workspace_id.value
    m.is_admin = member.is_admin

    return m
  }
}
