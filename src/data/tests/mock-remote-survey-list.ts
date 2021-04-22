import { RemoteLoadSurveyList } from '@/data/usecases'
import faker from 'faker'

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.word(),
  date: faker.date.recent().toISOString(),
  didAnswer: true
})

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => ([
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel()
])
