import React, { FC } from 'react'

export const AppLogo: FC = ({}) => {
  return (
    <div className="ml-2 mr-8 flex items-center leading-[0]">
      <img src="/icon-white.svg" alt="" width="28" height="28" />
      <span className="ml-4 text-xl tracking-wider">ProjectFusion</span>
    </div>
  )
}
