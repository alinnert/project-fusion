import classNames from 'classnames'
import { FC, PropsWithChildren, useEffect, useRef } from 'react'
import { createId } from '../../utils/customNanoId'
import { defaultMatch, matchBoolToString, matchUnion } from '../../utils/match'

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
        matchUnion<FormItemType, string>(type, {
          [defaultMatch]: 'flex-col',
          inline: 'flex-row gap-x-2 items-center',
        }),
        className,
      )}
    >
      {label !== undefined ? (
        <span
          className={classNames(
            'font-semibold text-sm',
            matchBoolToString(type === 'block', 'mb-1'),
            matchUnion<FormItemType, string>(type, {
              [defaultMatch]: 'flex-0 order-1',
              inline: 'flex-1 order-2',
            }),
          )}
        >
          {label}
        </span>
      ) : null}

      <div
        className={classNames(
          'flex flex-col',
          matchUnion<FormItemType, string>(type, {
            [defaultMatch]: 'flex-0 order-2',
            inline: 'flex-0 order-1',
          }),
        )}
      >
        {children}
      </div>
    </label>
  )
}
