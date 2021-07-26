import { SearchIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import { Button } from './Button'
import { Input } from './Input'

interface Props {}

export const HeaderSearch: FC<Props> = ({}) => {
  return (
    <>
      <Input
        placeholder="Suchen / Zu Projekt springen..."
        inputType="header"
        className="ml-2"
      />
      <Button buttonType="header" icon={<SearchIcon />}>
        Suchen
      </Button>
    </>
  )
}
