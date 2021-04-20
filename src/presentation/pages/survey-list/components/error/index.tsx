import React from 'react'

type Props = {
  error: string
  reload: () => void
}

const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div>
      <span role='error'>{error}</span>
      <button role='reload' onClick={reload}>Tentar novamente</button>
    </div>
  )
}

export default Error
