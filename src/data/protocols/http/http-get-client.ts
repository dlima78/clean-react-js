import { HttpResponse } from '@/data/protocols/http'

export interface HttpGetClient<R = any> {
  get: (params: HttpGetParams) => Promise<HttpResponse<R>>
}

export type HttpGetParams = {
  url: string
  headers?: any
}
