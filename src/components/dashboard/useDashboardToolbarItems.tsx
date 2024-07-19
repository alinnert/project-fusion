import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ToolbarItem } from '../ui/toolbar/ToolbarContainer'

type UseDashboardToolbarItemsOptions = {
  saveDashboard: () => void
}

export function useDashboardToolbarItems({
  saveDashboard,
}: UseDashboardToolbarItemsOptions): ToolbarItem[] {
  const { t } = useTranslation()
  const navigate = useNavigate()

  function isFormValid(): boolean {
    // Currently the form is always valid. The content of`notes` doesn't matter.
    return true
  }

  function cancel(): void {
    navigate('/groups')
  }

  return [
    {
      type: 'button',
      buttonType: 'primary',
      label: t('common:buttons.save'),
      icon: <CheckIcon />,
      disabled: !isFormValid(),
      action: saveDashboard,
    },
    {
      type: 'button',
      buttonType: 'flat',
      label: t('common:buttons.cancel'),
      icon: <XMarkIcon />,
      action: cancel,
    },
  ]
}
