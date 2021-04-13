import {
  HttpPostClient,
  HttpStatusCode,
  HttpPostParams,
  HttpGetParams,
  HttpResponse,
  HttpGetClient
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

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string
  async get (params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url
    return null
  }
}
