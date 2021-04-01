import { MinLengthValidation } from './min-length-validation'

import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.random.word(), 5)

describe('MinLengthValidation', () => {
  test('Shoud return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })
  test('Shoud return falsy if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})
