import React, { FC } from 'react'
import { useAppSelector } from '../../redux'

export const CurrentFile: FC = () => {
  const currentFile = useAppSelector((state) => state.database.filename)
  
  return (
    <div className="text-brand-200 font-semibold">
      {currentFile}
    </div>
  )
}