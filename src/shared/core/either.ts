export class Left<L, R> {
  readonly value: L
  readonly isSuccess: boolean

  constructor(value: L) {
    this.value = value
  }

  public isLeft(): this is Left<L, R> {
    return true
  }

  public isRight(): this is Right<L, R> {
    return false
  }
}

export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  public isLeft(): this is Left<L, R> {
    return false
  }

  public isRight(): this is Right<L, R> {
    return true
  }
}

export type Either<L, R> = Right<L, R> | Left<L, R>

export const right = <L, R>(r: R): Either<L, R> => {
  return new Right(r)
}

export const left = <L, R>(l: L): Either<L, R> => {
  return new Left(l)
}

export const combine = <L>(results: Either<L, any>[]): Either<L[], Either<L, any>[]> => {
  const lefts: L[] = []
  for (const result of results) {
    if (result.isLeft()) {
      lefts.push(result.value)
    }
  }

  return lefts.length ? left(lefts) : right(results)
}
