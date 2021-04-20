import { SurveyModel } from '@/domain/models'
import faker from 'faker'
import { LoadSurveyList } from '../usecases/load-survey-list'

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.word(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.random.word()
  }],
  date: faker.date.recent(),
  didAnswer: true
})

export const mockSurveyListModel = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()
  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveys
  }
}
