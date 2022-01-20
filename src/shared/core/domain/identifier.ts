import { v4 as uuidv4 } from 'uuid'

export class Identifier {
  public readonly value: string;

  constructor(id?: string) {
    this.value = id || uuidv4()
  }

  public equals(id: Identifier): boolean {
    if (!(id instanceof Identifier)) {
      return false
    }

    return id.value === this.value
  }
}
