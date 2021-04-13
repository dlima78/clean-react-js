// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from './'

export interface HttpPostClient<R = any> {
  post: (params: HttpPostParams) => Promise<HttpResponse<R>>
}

export type HttpPostParams = {
  url: string
  body?: any
}
