export class Left<L, R> {
  public readonly value: L

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
  public readonly value: R

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

export const combineLefts = <L>(...eithers: Either<L, any>[]): L[] => {
  const lefts: L[] = []

  for (const either of eithers) {
    if (either.isLeft()) {
      lefts.push(either.value)
    }
  }

  return lefts
}
