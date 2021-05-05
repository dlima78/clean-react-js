import faker from 'faker'

import { RemoteSaveSurveyResult } from '@/data/usecases'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/tests'
import { RemoteLoadSurveyResult } from '../load-survey-result/remote-load-survey-result'
import { mockSaveSurveyResultParams } from '@/domain/tests'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyResult.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteSaveSurveyResult.Model>()
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveSurveyResult', () => {
  test('Shout call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url()
    const { sut, httpClientSpy } = makeSut(url)
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResultModel()
    }
    const saveSurveyResultParams = mockSaveSurveyResultParams()
    await sut.save(saveSurveyResultParams)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
    expect(httpClientSpy.body).toEqual(saveSurveyResultParams)
  })
})
