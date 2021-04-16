import React, { memo } from 'react'
import { Logo } from '@/presentation/components'
import * as S from './styled'

const Header: React.FC = () => {
  return (
    <S.HeaderWrap>
      <S.HeaderContent>
        <Logo logoWidth='60px'/>
        <S.LogoutWrap>
          <S.UserName>Eduardo</S.UserName>
          <S.LogoutLink href='#'>Sair</S.LogoutLink>
        </S.LogoutWrap>
      </S.HeaderContent>
    </S.HeaderWrap>
  )
}

export default memo(Header)
