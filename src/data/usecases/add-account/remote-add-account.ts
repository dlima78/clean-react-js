import { HttpPostClient } from '@/data/protocols/http'
import { AddAccount } from '@/domain/usecases/add-account'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccount.Params, AddAccount.Model>
  ) {}

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    return Promise.resolve(null)
  }
}
