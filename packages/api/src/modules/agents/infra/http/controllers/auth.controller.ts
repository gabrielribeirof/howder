import { Request, Response } from 'express'

export class AuthController {
  public signin(request: Request, response: Response): void {
    const { email, password } = request.body
  }
}
