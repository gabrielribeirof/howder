export interface AgentData {
  name: string
  email: string
  password: { value: string, hashed: boolean }
  is_admin: boolean
}
