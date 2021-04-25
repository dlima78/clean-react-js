import {
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation
} from '@/validation/validators'
import { makeLoginValidation } from './login-validation-factory'

describe('LoginValidationFactory', () => {
  test('Should make ValidationComposite with correct validation', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password')
    ]))
  })
})
