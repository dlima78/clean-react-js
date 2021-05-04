import faker from 'faker'

import { RemoteLoadSurveyResult } from '@/data/usecases'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(),
  date: faker.date.recent().toISOString(),
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
  }]
})