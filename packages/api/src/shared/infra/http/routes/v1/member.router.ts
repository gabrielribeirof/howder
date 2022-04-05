import { Router } from 'express'

import { MemberController } from '@modules/workspaces/infra/http/controllers/member.controller'

const memberController = new MemberController()

const memberRouter = Router()

memberRouter.post('/', memberController.store)
memberRouter.delete('/:member_id', memberController.destroy)

export { memberRouter }
