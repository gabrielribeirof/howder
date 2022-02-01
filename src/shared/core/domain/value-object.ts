export abstract class ValueObject<Properties> {
  protected properties: Properties

  constructor(properties: Properties) {
    this.properties = properties
  }

  public equals(vo: ValueObject<Properties>): boolean {
    return JSON.stringify(this.properties) === JSON.stringify(vo.properties)
  }
}
