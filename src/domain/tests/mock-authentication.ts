import faker from 'faker'
import { Authentication } from '@/domain/usecases'
import { AccountModel } from '../models'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): AccountModel => ({
  accessToken: faker.random.uuid()
})
