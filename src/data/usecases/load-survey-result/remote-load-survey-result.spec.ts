import { HttpGetClientSpy } from '@/data/tests'
import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'

import faker from 'faker'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyResult.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyResult.Model>()
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyResult', () => {
  test('Shout call HttpGetClient with correct URL', () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
