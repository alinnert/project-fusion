import classNames from 'classnames'
import React from 'react'
import { FC } from 'react'
import icon from '../../assets/icon-gradient.svg?raw'

export const AppSplashScreen: FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div
        className="h-[100px] w-[100px] animate-pulse"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <p
        className={classNames(
          'mt-8',
          'text-3xl font-semibold text-neutral-500',
          'uppercase tracking-widest',
        )}
      >
        Project Fusion
      </p>
    </div>
  )
}
