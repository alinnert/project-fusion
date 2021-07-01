import { FC } from 'react'

interface Props {
  
}

export const Layout: FC<Props> = ({}) => {
  return (
    <div className="
      grid grid-cols-[200px,1fr,1fr] grid-rows-[auto,auto,1fr]
      fixed inset-0
    ">
      <div className="
        row-start-1 row-span-1 col-start-1 col-span-1
        bg-blue-700 text-white
      ">
        ProjectFusion
      </div>

      <div className="
        row-start-1 row-span-1 col-start-2 col-span-2
        bg-blue-700 text-white
      ">
        Links und Suche 3
      </div>

      <div className="
        row-start-2 row-span-1 col-start-1 col-span-1
        bg-gray-200
      ">
        Sidebar Toolbar
      </div>

      <div className="
        row-start-2 row-span-1 col-start-2 col-span-2
        bg-gray-200
      ">
        Main Toolbar
      </div>

      <div className="row-start-3 row-span-1 col-start-2 col-span-1">
        Detail Links
      </div>

      <div className="row-start-3 row-span-1 col-start-3 col-span-1">
        Detail Rechts
      </div>
    </div>
  )
}