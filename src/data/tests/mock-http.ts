import {
  HttpPostClient,
  HttpStatusCode,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'

import faker from 'faker'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse<R>> {
    this.body = params.body
    this.url = params.url
    return Promise.resolve(this.response)
  }
}
