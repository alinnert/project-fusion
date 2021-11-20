import { FC } from 'react'

interface Props {}

export const AppLogo: FC<Props> = ({}) => {
  return (
    <div className="ml-2 mr-4 leading-[0]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icon-white.svg" alt="" width="28" height="28" />
    </div>
  )
}
