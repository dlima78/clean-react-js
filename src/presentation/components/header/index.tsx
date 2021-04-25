import React, { memo, useContext } from 'react'

import { ApiContext } from '@/presentation/contexts'
import { Logo } from '@/presentation/components'
import * as S from './styled'
import { useLogout } from '@/presentation/components/hooks'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useContext(ApiContext)

  const buttonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }

  return (
    <S.HeaderWrap>
      <S.HeaderContent>
        <Logo logoWidth='60px'/>
        <S.LogoutWrap>
          <S.UserName role='username' >{ getCurrentAccount().name }</S.UserName>
          <S.LogoutLink href='#' onClick={buttonClick} >Sair</S.LogoutLink>
        </S.LogoutWrap>
      </S.HeaderContent>
    </S.HeaderWrap>
  )
}

export default memo(Header)
