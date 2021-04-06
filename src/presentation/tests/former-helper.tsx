import { screen } from '@testing-library/react'

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
