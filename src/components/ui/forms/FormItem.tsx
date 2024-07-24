import classNames from 'classnames'
import React, { FC, PropsWithChildren, useEffect, useRef } from 'react'
import { createId } from '../../../utils/customNanoId'
import { mapBooleanToString, mapUnionToString } from '../../../utils/map'

export type FormItemType = 'block' | 'inline'

interface Props {
  type?: FormItemType
  label?: string
  className?: string
}

export const FormItem: FC<PropsWithChildren<Props>> = ({
  type = 'block',
  label,
  className,
  children,
}) => {
  const elementId = useRef<string | null>(null)

  useEffect(() => {
    elementId.current = createId()
  }, [])

  return (
    <label
      className={classNames(
        'flex',
        mapUnionToString(type, {
          block: 'flex-col',
          inline: 'flex-row items-center gap-x-2',
        }),
        className,
      )}
    >
      {label !== undefined ? (
        <span
          className={classNames(
            'text-sm font-semibold',
            mapBooleanToString(type === 'block', 'mb-1'),
            mapUnionToString(type, {
              block: 'flex-0 order-1',
              inline: 'order-2 flex-1',
            }),
          )}
        >
          {label}
        </span>
      ) : null}

      <div
        className={classNames(
          'flex flex-col',
          mapUnionToString(type, {
            block: 'flex-0 order-2',
            inline: 'flex-0 order-1',
          }),
        )}
      >
        {children}
      </div>
    </label>
  )
}
