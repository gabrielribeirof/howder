import { Either, left, right } from '@shared/core/logic/either'
import { DomainError } from '@shared/core/errors/domain-error'
import { ServiceError } from '@shared/core/errors/service-error'

import { EmailAlreadyRegisteredError } from '@shared/core/errors/services/email-already-registered.error'

import { User } from '../domain/user/user'
import { IUsersRepository } from '../repositories/iuser.repository'

interface IRequest {
  name: string
  email: string
}

type IResponse = Either<ServiceError[] | DomainError[], User>

export class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email }: IRequest): Promise<IResponse> {
    const userOrError = User.create({
      name,
      email
    })

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const emailExists = await this.usersRepository.findByEmail(email)

    if (emailExists) {
      return left([new EmailAlreadyRegisteredError(emailExists.email.value)])
    }

    const user = await this.usersRepository.save(userOrError.value)

    return right(user)
  }
}
