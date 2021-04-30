import React from 'react'
import { Ellipsis } from './styled'

type Props = React.HTMLAttributes<HTMLElement> & {
  bgWhite?: boolean
}

const Spinner: React.FC<Props> = ({ bgWhite, ...props }: Props) => {
  return (
    <Ellipsis bgWhite {...props}>
      <div/><div/><div/><div/>
    </Ellipsis>
  )
}

export default Spinner
