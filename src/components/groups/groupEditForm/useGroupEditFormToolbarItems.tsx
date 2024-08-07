import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ProjectGroup } from '../../../redux/groups'
import { ToolbarItem } from '../../ui/toolbar/ToolbarContainer'

type UseGroupEditFormToolbarItemsOptions = {
  init: ProjectGroup | null
  name: string
  color: string
  saveGroup: () => void
}

export function useGroupEditFormToolbarItems({
  init,
  name,
  color,
  saveGroup,
}: UseGroupEditFormToolbarItemsOptions): ToolbarItem[] {
  const { t } = useTranslation()
  const navigate = useNavigate()

  function isFormValid(): boolean {
    if (name.trim() === '') return false
    if (!color.match(/^#[0-9a-fA-F]{3,6}$/)) return false
    return true
  }

  function cancel(): void {
    if (init !== null) {
      navigate(`/groups/${init.id}`)
      return
    }

    navigate('/groups')
  }

  return [
    {
      type: 'button',
      buttonType: 'primary-flat',
      label: t('common:buttons.save'),
      icon: <CheckIcon />,
      disabled: !isFormValid(),
      action: saveGroup,
    },
    {
      type: 'button',
      label: t('common:buttons.cancel'),
      icon: <XMarkIcon />,
      action: cancel,
    },
  ]
}
