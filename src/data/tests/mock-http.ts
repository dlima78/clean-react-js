import {
  HttpPostClient,
  HttpStatusCode,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'
import { Authentication } from '@/domain/usecases'

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
