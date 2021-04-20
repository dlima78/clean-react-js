import React from 'react'

type Props = {
  error: string
}

const Error: React.FC<Props> = ({ error }: Props) => {
  return (
    <div>
      <span role='error'>{error}</span>
      <button>Tentar novamente</button>
    </div>
  )
}

export default Error
