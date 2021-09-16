export abstract class ValueObject<T> {
  readonly props: T

  constructor(props: T) {
    this.props = props
  }

  public equals(vo: ValueObject<T>): boolean {
    return JSON.stringify(this.props) === JSON.stringify(vo.props)
  }
}