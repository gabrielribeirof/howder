import request from 'supertest'
import { config } from '@test/helpers/config'
import { mock } from '@test/helpers/mocks/agent'
import { dbConnection } from '@test/helpers/db-connection'

import { AgentEntity } from '@infra/typeorm/entities/agent.entity'

describe('Authorization', () => {
  beforeAll(async () => await dbConnection.create())
  afterAll(async () => await dbConnection.close())

  afterEach(async () => {
    await dbConnection.instance?.createQueryBuilder()
      .delete()
      .from(AgentEntity)
      .execute()
  })

  it('POST /signup', async () => {
    const response = await request(config.url)
      .post('/auth/signup')
      .send(mock)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        agent: expect.objectContaining({
          id: expect.any(String),
          name: mock.name,
          email: mock.email
        }),
        token: expect.any(String)
      })
    )
  })

  it('POST /signup with invalid parameters', async () => {
    const response = await request(config.url)
      .post('/auth/signup')
      .send({
        name: 'J',
        email: 'invalid-email',
        password: 'wrong'
      })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      status: '400',
      code: 'INVALID_PARAMETER',
      message: 'Invalid parameter passed',
      violations: [
        {
          reason: 'BAD_LENGTH',
          field: 'name',
          message: 'Must contain between 2 and 32 characters'
        },
        {
          reason: 'INVALID_EMAIL',
          field: 'email',
          message: 'Email address invalid'
        },
        {
          reason: 'BAD_LENGTH',
          field: 'password',
          message: 'Must contain between 6 and 128 characters'
        }
      ]
    })
  })

  it('POST /signin', async () => {
    await request(config.url)
      .post('/auth/signup')
      .send(mock)

    const response = await request(config.url)
      .post('/auth/signin')
      .send({
        email: mock.email,
        password: mock.password
      })

    console.log(response.body)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        agent: expect.objectContaining({
          id: expect.any(String),
          name: mock.name,
          email: mock.email
        }),
        token: expect.any(String)
      })
    )
  })
})
