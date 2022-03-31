import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IMembersRepository } from '../repositories/imembers.repository'
import { IAgentsRepository } from '@modules/agents/repositories/iagents.repository'
import { IWorkspacesRespository } from '../repositories/iworkspaces.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnknownWorkspaceError } from '@shared/errors/unknown-workspace.error'
import { UnknownAgentError } from '@shared/errors/unknown-agent.error'
import { AlreadyExistsError } from '@shared/errors/already-exists.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { createMember } from '../domain/member/factories/member.factory'

type CreateMemberRequest = {
  email: string
  workspace_id: string
  requester_id: string
}

export class CreateMemberService {
  constructor(
    private workspacesRespository: IWorkspacesRespository,
    private membersRepository: IMembersRepository,
    private agentsRepository: IAgentsRepository
  ) {}

  public async execute({
    email,
    workspace_id,
    requester_id
  }: CreateMemberRequest): Promise<Either<AppError, null>> {
    const workspace = await this.workspacesRespository.findById(workspace_id)

    if (!workspace) {
      return left(new UnknownWorkspaceError())
    }

    const requesterMember = await this.membersRepository.findByWorkspaceIdAndAgentId(workspace_id, requester_id)

    if (!requesterMember || !requesterMember.is_admin) {
      return left(new UnauthorizedError())
    }

    const agentToBecomeMember = await this.agentsRepository.findByEmail(email)

    if (!agentToBecomeMember) {
      return left(new UnknownAgentError())
    }

    const memberAlreadyExists = await this.membersRepository
      .findByWorkspaceIdAndAgentId(workspace_id, agentToBecomeMember.id.value)

    if (memberAlreadyExists) {
      return left(new AlreadyExistsError())
    }

    const member = createMember({
      agent_id: agentToBecomeMember.id.value,
      workspace_id
    })

    if (member.isLeft()) {
      return left(new InvalidParameterError(member.value))
    }

    await this.membersRepository.save(member.value)

    return right(null)
  }
}
