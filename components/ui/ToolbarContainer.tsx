import { FC, PropsWithChildren } from 'react'
import { Button, ButtonType } from './Button'

interface ToolbarButton {
  type: 'button'
  buttonType?: ButtonType
  label: string
  action: () => void
}

type ToolbarItem = ToolbarButton

interface Props {
  toolbarItems?: ToolbarItem[]
}

export const ToolbarContainer: FC<PropsWithChildren<Props>> = ({
  children,
  toolbarItems = [],
}) => {
  return (
    <div className="grid grid-rows-[auto,1fr] overflow-hidden h-full">
      {toolbarItems.length > 0 ? (
        <div className="bg-neutral-200 p-2 flex gap-x-2">
          {toolbarItems.map((item, index) =>
            item.type === 'button' ? (
              <Button
                key={index}
                buttonType={item.buttonType ?? 'default'}
                onClick={item.action}
              >
                {item.label}
              </Button>
            ) : null,
          )}
        </div>
      ) : null}
      <div className="row-start-2 overflow-auto">{children}</div>
    </div>
  )
}
