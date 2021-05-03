import { LoadSurveyResult } from '@/domain/usecases'

import faker from 'faker'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.random.word(),
    count: faker.datatype.number(),
    percent: faker.datatype.number(100),
    isCurrentAccountanswer: faker.datatype.boolean()
  }, {
    answer: faker.random.word(),
    count: faker.datatype.number(),
    percent: faker.datatype.number(100),
    isCurrentAccountanswer: faker.datatype.boolean()
  }],
  date: faker.date.recent()
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callscount = 0
  surveyResult = mockSurveyResultModel()
  async load (): Promise<LoadSurveyResult.Model> {
    this.callscount++
    return this.surveyResult
  }
}
