import { Workspace } from '../domain/workspace/workspace'
import { WorkspaceDTO } from '../dtos/workspace.dto'
import { WorkspaceEntity } from '@shared/infra/typeorm/entities/workspace.entity'
import { createWorkspace } from '../domain/workspace/factories/workspace.factory'

export class WorkspaceMapper {
  public static toDTO(workspace: Workspace): WorkspaceDTO {
    return {
      id: workspace.id.value,
      name: workspace.name.value,
      creator_id: workspace.creator_id.value
    }
  }

  public static toDomain(workspace: WorkspaceEntity): Workspace {
    const result = createWorkspace({
      id: workspace.id,
      name: workspace.name,
      creator_id: workspace.creator_id
    })

    if (result.isLeft()) throw new Error('Error on WorkspaceMapper.toDomain()')

    return result.value
  }

  public static toPersistence(workspace: Workspace): WorkspaceEntity {
    const w = new WorkspaceEntity()

    w.id = workspace.id.value
    w.name = workspace.name.value
    w.creator_id = workspace.creator_id.value

    return w
  }
}
