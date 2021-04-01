import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (field: string): SutTypes => {
  const sut = new RequiredFieldValidation(field)
  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  test('Should return erro if field is empty', () => {
    const { sut } = makeSut('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
