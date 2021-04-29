import React from 'react'
import { Ellipsis } from './styled'

type Props = React.HTMLAttributes<HTMLElement> & {
  bgWhite?: boolean
}

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <Ellipsis bgWhite={ props.bgWhite } {...props}>
      <div/><div/><div/><div/>
    </Ellipsis>
  )
}

export default Spinner
