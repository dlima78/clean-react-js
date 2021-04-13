import { SurveyModel } from '@/domain/models'
import faker from 'faker'

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
