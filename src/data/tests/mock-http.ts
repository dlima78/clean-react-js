import { HttpPostClient, HttpPostParams } from '@/data/protocols/http'
import faker from 'faker'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: any
  async post (params: HttpPostParams): Promise<void> {
    this.body = params.body
    this.url = params.url
    return Promise.resolve()
  }
}
