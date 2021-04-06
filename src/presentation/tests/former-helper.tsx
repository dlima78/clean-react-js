import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import faker from 'faker'

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByRole(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const testChildCount = (field: string, count: number): void => {
  const el = screen.getByRole(field)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisable = (fieldName: string, buttonName: RegExp, isDisabled: boolean): void => {
  const button = screen.getByRole(fieldName, { name: buttonName }) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByRole(fieldName)
  userEvent.type(input, value)
}

export const testElementExist = (fieldName: string): void => {
  const element = screen.getByRole(fieldName)
  expect(element).toBeTruthy()
}
