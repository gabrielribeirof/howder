import { Router } from 'express'

import { TeamController } from '@modules/workspaces/infra/http/controllers/team.controller'
import { TeamMemberController } from '@modules/workspaces/infra/http/controllers/team-member.controller'

const teamController = new TeamController()
const teamMemberController = new TeamMemberController()

const teamRouter = Router()

teamRouter.post('/', teamController.store)
teamRouter.patch('/:team_id', teamController.update)
teamRouter.delete('/:team_id', teamController.destroy)

teamRouter.post('/:team_id/members/:member_id', teamMemberController.store)
teamRouter.delete('/:team_id/members/:member_id', teamMemberController.destroy)

export { teamRouter }
