export interface IGuardResult {
  succeeded: boolean
}

export class Guard {
  public static greaterThan(minValue: number, actualValue: number): IGuardResult {
    return actualValue > minValue ? { succeeded: true } : { succeeded: false }
  }

  public static againstAtLeast(numChars: number, text: string): IGuardResult {
    return text.length >= numChars ? { succeeded: true } : { succeeded: false }
  }

  public static againstAtMost(numChars: number, text: string): IGuardResult {
    return text.length <= numChars ? { succeeded: true } : { succeeded: false }
  }

  public static againstNullOrUndefined(value: any): IGuardResult {
    return (value === null || value === undefined) ? { succeeded: false } : { succeeded: true }
  }

  public static isOneOf(value: any, validValues: any[]): IGuardResult {
    let isValid = false
    for (const validValue of validValues) {
      if (value === validValue) isValid = true
    }

    return isValid ? { succeeded: true } : { succeeded: false }
  }

  public static inRange(num: number, min: number, max: number): IGuardResult {
    const isInRange = num >= min && num <= max

    return isInRange ? { succeeded: true } : { succeeded: false }
  }
}
