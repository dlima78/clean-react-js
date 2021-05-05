import {
  HttpClient,
  HttpRequest,
  HttpStatusCode,
  HttpResponse
} from '@/data/protocols/http'

import faker from 'faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()
})

export class HttpClientSpy<R> implements HttpClient<R> {
  url?: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse<R>> {
    this.body = data.body
    this.url = data.url
    this.method = data.method
    this.headers = data.headers
    return Promise.resolve(this.response)
  }
}
