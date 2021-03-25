// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from './'

export interface HttpPostClient {
  post: (params: HttpPostParams) => Promise<HttpResponse>
}

export type HttpPostParams = {
  url: string
  body: any
}
