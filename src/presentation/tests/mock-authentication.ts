import { Authentication } from '@/domain/usecases'
import { mockAuthenticationModel } from '@/domain/tests'

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel()
  params: Authentication.Params
  callsCount = 0
  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    this.callsCount++
    this.params = params
    return Promise.resolve(this.account)
  }
}
