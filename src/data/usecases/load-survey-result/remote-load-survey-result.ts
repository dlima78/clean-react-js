import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/usecases'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async load (): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      case HttpStatusCode.notFound: throw new UnexpectedError()
      default: return null
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string
    answers: [{
      image: string
      answer: string
      count: number
      percent: number
      isCurrentAccountanswer: boolean
    }]
    date: Date
  }
}
