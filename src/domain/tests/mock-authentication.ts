import faker from 'faker'
import { Authentication } from '@/domain/usecases'

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})