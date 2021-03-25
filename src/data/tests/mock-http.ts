import {
  HttpPostClient,
  HttpStatusCode,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'

import faker from 'faker'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.body = params.body
    this.url = params.url
    return Promise.resolve(this.response)
  }
}
