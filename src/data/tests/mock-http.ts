import {
  HttpPostClient,
  HttpStatusCode,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: any
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse> {
    this.body = params.body
    this.url = params.url
    return Promise.resolve(this.response)
  }
}
