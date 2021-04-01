import { MinLengthValidation } from './min-length-validation'

import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.random.word(), 5)

describe('MinLengthValidation', () => {
  test('', () => {
    const sut = makeSut()
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })
})
