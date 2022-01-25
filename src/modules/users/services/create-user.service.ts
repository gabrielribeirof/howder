import { AppError } from '@shared/core/errors/app-error'
import { Either, left, right } from '@shared/core/logic/either'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { EmailAlreadyRegisteredViolation } from '@shared/errors/violations/email-already-registered.violation'

import { User } from '../domain/user/user'
import { IUsersRepository } from '../repositories/iuser.repository'

type Request = {
  name: string
  email: string
}

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(request: Request): Promise<Either<AppError, User>> {
    const userOrError = User.create({
      name: request.name,
      email: request.email
    })

    if (userOrError.isLeft()) {
      return left(new InvalidParameterError(userOrError.value))
    }

    const user = userOrError.value

    const emailExists = await this.usersRepository.findByEmail(user.email)

    if (emailExists) {
      return left(new InvalidParameterError([
        new EmailAlreadyRegisteredViolation(user.email.value)
      ]))
    }

    return right(await this.usersRepository.save(user))
  }
}
