export interface IGuardResult {
  succeeded: boolean
}

function mountResult(expression: boolean): IGuardResult {
  return expression ? { succeeded: true } : { succeeded: false }
}

export class Guard {
  public static greaterThan(minValue: number, actualValue: number): IGuardResult {
    return mountResult(actualValue > minValue)
  }

  public static againstAtLeast(numChars: number, text: string): IGuardResult {
    return mountResult(text.length >= numChars)
  }

  public static againstAtMost(numChars: number, text: string): IGuardResult {
    return mountResult(text.length <= numChars)
  }

  public static againstNullOrUndefined(value: any): IGuardResult {
    return mountResult((value === null || value === undefined))
  }

  public static isOneOf(value: any, validValues: any[]): IGuardResult {
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
