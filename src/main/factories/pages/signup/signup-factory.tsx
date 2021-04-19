import { Signup } from '@/presentation/pages'
import React from 'react'
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignup: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
    />
  )
}
