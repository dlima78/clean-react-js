import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '@/validation/tests/mock-validation'

import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = new ValidationComposite(fieldValidationSpy)
  return {
    sut,
    fieldValidationSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpy } = makeSut(fieldName)
    const error1 = faker.random.word()
    fieldValidationSpy[0].error = new Error(error1)
    fieldValidationSpy[1].error = new Error(faker.random.word())
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(error1)
  })

  test('Should return falsy if success', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
