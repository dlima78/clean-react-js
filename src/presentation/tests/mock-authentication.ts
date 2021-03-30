import { Authentication } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  account: Authentication.Model
  params: Authentication.Params
  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params
    return Promise.resolve(this.account)
  }
}
