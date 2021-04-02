import { RequiredFieldValidation } from '@/validation/validators'
import { ValidationBuilder } from './validation-builder'

import faker from 'faker'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = ValidationBuilder.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })
})
