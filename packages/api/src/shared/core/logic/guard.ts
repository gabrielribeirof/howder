export interface IGuardResult {
  succeeded: boolean
  fail: boolean
}

function mountResult(expression: boolean): IGuardResult {
  return expression
    ? { succeeded: true, fail: false }
    : { succeeded: false, fail: true }
}

export class Guard {
  public static greaterThan(minValue: number, actualValue: number): IGuardResult {
    return mountResult(actualValue > minValue)
  }

  public static atLeast(minValue: number, actualValue: number): IGuardResult {
    return mountResult(actualValue >= minValue)
  }

  public static atMost(maxValue: number, actualValue: number): IGuardResult {
    return mountResult(actualValue <= maxValue)
  }

  public static againstNullOrUndefined(value: any): IGuardResult {
    return mountResult(!(value === null) || !(value === undefined))
  }

  public static isOneOf(value: string | number, validValues: (number | string)[]): IGuardResult {
    let isValid = false
    for (const validValue of validValues) {
      if (value === validValue) {
        isValid = true
        break
      }
    }

    return mountResult(isValid)
  }

  public static inRange(num: number, min: number, max: number): IGuardResult {
    return mountResult(num >= min && num <= max)
  }
}
