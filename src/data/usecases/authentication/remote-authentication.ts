import { HttpPostClient } from '@/data/protocols/http';
import { Authentication } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
    ) {}

  async auth (): Promise<Authentication.Result> {
     await this.httpPostClient.post({ url: this.url })
     return null
  }
}