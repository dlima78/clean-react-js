import React from 'react'
import { Ellipsis } from './styled'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <Ellipsis {...props}>
      <div/><div/><div/><div/>
    </Ellipsis>
  )
}

export default Spinner
