import { HttpResponse } from '@/data/protocols/http'

export interface HttpGetClient<R> {
  get: (params: HttpGetParams) => Promise<HttpResponse<R>>
}

export type HttpGetParams = {
  url: string
}
