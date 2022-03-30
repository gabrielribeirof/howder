import { container } from 'tsyringe'

import '@shared/providers'

import { IAgentsRepository } from '@modules/agents/repositories/iagents.repository'
import { TypeORMAgentsRepository } from '@modules/agents/repositories/typeorm/typeorm-agents.repository'

import { IUsersRepository } from '@modules/users/repositories/iusers.repository'
import { TypeORMUsersRepository } from '@modules/users/repositories/typeorm/typeorm-users.repository'

import { IWorkspacesRespository } from '@modules/workspaces/repositories/iworkspaces.repository'
import { TypeORMWorkspacesRepository } from '@modules/workspaces/repositories/typeorm/typeorm-workspaces.repository'

import { IMembersRepository } from '@modules/workspaces/repositories/imembers.repository'
import { TypeORMMembersRespository } from '@modules/workspaces/repositories/typeorm/typeorm-members.repository'

import { ITeamsRepository } from '@modules/workspaces/repositories/iteams.repository'
import { TypeORMTeamsRespository } from '@modules/workspaces/repositories/typeorm/typeorm-teams.repository'

import { IChatsRepository } from '@modules/chats/repositories/ichats.repository'
import { TypeORMChatsRepository } from '@modules/chats/repositories/typeorm/typeorm-chats.repository'

import { IMessagesRespository } from '@modules/chats/repositories/imessages.repository'
import { TypeORMMessagesRespository } from '@modules/chats/repositories/typeorm/typeorm-messages.repository'

import { ITagsRepository } from '@modules/chats/repositories/itags.repository'
import { TypeORMTagsRepository } from '@modules/chats/repositories/typeorm/typeorm-tags.repository'

container.registerSingleton<IAgentsRepository>(
  'AgentsRepository',
  TypeORMAgentsRepository
)

container.registerSingleton<IUsersRepository>(
  'IUsersRepository',
  TypeORMUsersRepository
)

container.registerSingleton<IWorkspacesRespository>(
  'WorkspacesRespository',
  TypeORMWorkspacesRepository
)

container.registerSingleton<IMembersRepository>(
  'MembersRepository',
  TypeORMMembersRespository
)

container.registerSingleton<ITeamsRepository>(
  'TeamsRepository',
  TypeORMTeamsRespository
)

container.registerSingleton<IChatsRepository>(
  'ChatsRepository',
  TypeORMChatsRepository
)

container.registerSingleton<IMessagesRespository>(
  'MessagesRespository',
  TypeORMMessagesRespository
)

container.registerSingleton<ITagsRepository>(
  'TagsRepository',
  TypeORMTagsRepository
)
