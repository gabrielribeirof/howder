import { MemberDTO } from './member.dto'
import { TeamDTO } from './team.dto'
import { TagDTO } from '@modules/chats/dtos/tag.dto'

export type WorkspaceWithDetailsDTO = {
  id: string
  name: string
  creator_id: string
  members: MemberDTO[]
  teams: TeamDTO[]
  tags: TagDTO[]
}
