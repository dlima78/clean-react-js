import React, { memo, useContext } from 'react'
import { useHistory } from 'react-router'

import { ApiContext } from '@/presentation/contexts'
import { Logo } from '@/presentation/components'
import * as S from './styled'

const Header: React.FC = () => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <S.HeaderWrap>
      <S.HeaderContent>
        <Logo logoWidth='60px'/>
        <S.LogoutWrap>
          <S.UserName>Eduardo</S.UserName>
          <S.LogoutLink href='#' onClick={logout} >Sair</S.LogoutLink>
        </S.LogoutWrap>
      </S.HeaderContent>
    </S.HeaderWrap>
  )
}

export default memo(Header)
