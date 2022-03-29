export type ChatDTO = {
  id: string
  user_id: string
  member_id?: string
  workspace_id: string
  tags_id: string[]
  is_open: boolean
}
