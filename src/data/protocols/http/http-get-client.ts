// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from './'

export interface HttpGetClient<T, R> {
  post: (params: HttpPostParams<T>) => Promise<HttpResponse<R>>
}

export type HttpPostParams<T> = {
  url: string
  body?: T
}
