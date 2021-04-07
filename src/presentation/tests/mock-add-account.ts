import { mockAccountModel } from '@/domain/tests'
import { AddAccount } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccount.Params
  callsCount = 0
  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
