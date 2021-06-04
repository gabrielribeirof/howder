export class Identifier<T> {
  private value: T

  constructor(value: T) {
    this.value = value
  }

  public equals(id: Identifier<T>): boolean {
    if (!(id instanceof this.constructor)) {
      return false
    }

    return id.value === this.value
  }
}
