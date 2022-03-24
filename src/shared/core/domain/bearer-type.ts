export type BearerTypeValue = 'user' | 'member'

export class BearerType {
  constructor(public readonly value: BearerTypeValue) {}

  public isUser(): boolean {
    return this.value === 'user'
  }

  public isMember(): boolean {
    return this.value === 'member'
  }
}
