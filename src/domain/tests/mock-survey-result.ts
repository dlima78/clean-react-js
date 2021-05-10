import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'

import faker from 'faker'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.random.word(),
    count: faker.datatype.number(),
    percent: faker.datatype.number(100),
    isCurrentAccountAnswer: true
  }, {
    answer: faker.random.word(),
    count: faker.datatype.number(),
    percent: faker.datatype.number(100),
    isCurrentAccountAnswer: false
  }],
  date: faker.date.recent()
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  surveyResult = mockSurveyResultModel()
  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++
    return this.surveyResult
  }
}

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words()
})

export class SaveSurveyResultSpy implements SaveSurveyResult {
  callsCount = 0
  params: SaveSurveyResult.Params
  surveyResult = mockSurveyResultModel()
  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.callsCount++
    this.params = params
    return this.surveyResult
  }
}
