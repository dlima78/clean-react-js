import { Calendar } from '@/presentation/components'
import { render, RenderResult, screen } from '@testing-library/react'
import React from 'react'

const makeSut = (date: Date): RenderResult => {
  return render(
    <Calendar date={date} />
  )
}

describe('Calendar Component', () => {
  test('Should render with correct values ', () => {
    makeSut(new Date('2021-01-10T06:00:00Z'))
    expect(screen.getByRole('day')).toHaveTextContent('10')
    expect(screen.getByRole('month')).toHaveTextContent('jan')
    expect(screen.getByRole('year')).toHaveTextContent('2021')
  })

  test('Should render with correct values ', () => {
    makeSut(new Date('2019-06-03T06:00:00Z'))
    expect(screen.getByRole('day')).toHaveTextContent('03')
    expect(screen.getByRole('month')).toHaveTextContent('jun')
    expect(screen.getByRole('year')).toHaveTextContent('2019')
  })
})
