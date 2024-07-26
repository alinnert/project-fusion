import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { setCurrentConfigId } from '../../redux/uiState'
import { CategorizedLinkItems, LinkItem, LinkList } from '../ui/LinkList'
import { useSettings } from './useSettings'

type Props = {
  currentId: string
}

export const SettingsPagesList: FC<Props> = ({ currentId }) => {
  const dispatch = useAppDispatch()

  const { settingsItems } = useSettings()
  const isFileOpen = useSelector(selectIsFileOpen)

  const items = useMemo<CategorizedLinkItems>(() => {
    if (isFileOpen) return settingsItems
    return settingsItems.filter((category) => category[0].id !== 'database')
  }, [isFileOpen, settingsItems])

  function handleItemClick(item: LinkItem): void {
    if (item.id === null) return
    dispatch(setCurrentConfigId(item.id))
  }

  return (
    <LinkList
      items={items}
      urlPrefix="/config"
      showIcons
      currentId={currentId}
      onItemClick={handleItemClick}
    />
  )
}
