import { Router } from 'express'

import { WorkspaceController } from '@modules/workspaces/infra/http/controllers/workspace.controller'

const workspaceController = new WorkspaceController()

const workspaceRouter = Router()

workspaceRouter.get('/', workspaceController.index)
workspaceRouter.get('/:workspace_id', workspaceController.show)
workspaceRouter.post('/', workspaceController.store)
workspaceRouter.patch('/:workspace_id', workspaceController.update)
workspaceRouter.delete('/:workspace_id', workspaceController.destroy)

export { workspaceRouter }
