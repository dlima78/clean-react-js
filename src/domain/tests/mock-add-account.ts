import { AddAccount } from '@/domain/usecases/add-account'
import faker from 'faker'
import { mockAccountModel } from './mock-account'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAddAccontModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  account = mockAddAccontModel()
  params: AddAccount.Params
  callsCount = 0
  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
