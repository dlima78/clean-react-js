import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'

import faker from 'faker'

const makeSut = (fieldToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.database.column(), fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', () => {
    const fieldToCompare = faker.database.column()
    const sut = makeSut(fieldToCompare)
    const error = sut.validate(fieldToCompare)
    expect(error).toBeFalsy()
  })
})
