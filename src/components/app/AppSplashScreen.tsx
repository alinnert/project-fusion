import classNames from 'classnames'
import React from 'react'
import { FC } from 'react'

export const AppSplashScreen: FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="w-24 animate-pulse">
        <img src="/icon-gradient.svg" alt="ProjectFusion Logo" />
      </div>
      <p
        className={classNames(
          'mt-8',
          'text-3xl font-semibold text-neutral-600',
          'uppercase tracking-wider',
        )}
      >
        Project Fusion
      </p>
    </div>
  )
}
