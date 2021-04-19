import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import faker from 'faker'

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByRole(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByRole(fieldName)
  userEvent.type(input, value)
}
