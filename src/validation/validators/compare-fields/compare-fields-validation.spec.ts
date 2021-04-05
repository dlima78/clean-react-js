import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors'

import faker from 'faker'

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column())

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
