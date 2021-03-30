import { Authentication } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  account: Authentication.Model
  params: Authentication.Params
  callsCount = 0
  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    this.callsCount++
    this.params = params
    return Promise.resolve(this.account)
  }
}
