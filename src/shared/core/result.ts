import { DomainError } from '../domain/errors/contracts/domain-error'

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value
  }

  public isLeft(): this is Left<L, A> {
    return true
  }

  public isRight(): this is Right<L, A> {
    return false
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value
  }

  public isLeft(): this is Left<L, A> {
    return false
  }

  public isRight(): this is Right<L, A> {
    return true
  }
}

export type Either<L, A> = Left<L, A> | Right<L, A>;

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l)
}

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a)
}

export class DomainResult {
  public static combine(results: Either<DomainError, any>[]): Either<DomainError[], any> {
    const lefts: DomainError[] = []
    for (const result of results) {
      if (result.isLeft()) {
        lefts.push(result.value)
      }
    }

    return lefts.length ? left(lefts) : right(results)
  }
}
