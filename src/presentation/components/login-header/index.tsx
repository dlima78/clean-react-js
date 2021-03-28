import React, { memo } from 'react'
import { Header, LogoDescription } from './styled'
import { Logo } from '@/presentation/components'

const LoginHeader: React.FC = () => {
  return (
    <Header>
      <Logo />
      <LogoDescription>4Dev - Enquetes para Programadores</LogoDescription>
    </Header>
  )
}

export default memo(LoginHeader)
