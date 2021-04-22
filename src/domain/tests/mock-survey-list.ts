import faker from 'faker'
import { LoadSurveyList } from '../usecases/load-survey-list'

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.word(),
  date: faker.date.recent(),
  didAnswer: true
})

export const mockSurveyListModel = (): LoadSurveyList.Model[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()
  async loadAll (): Promise<LoadSurveyList.Model[]> {
    this.callsCount++
    return this.surveys
  }
}
