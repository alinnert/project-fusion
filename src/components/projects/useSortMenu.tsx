import { ArrowsUpDownIcon } from '@heroicons/react/20/solid'
import React, { ReactElement, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useGroupActions } from '../../pages/groups/useGroupActions'
import { useAppSelector } from '../../redux'
import { ProjectsSortOrder } from '../../redux/settings'
import { DropdownMenu, DropdownMenuItem } from '../ui/dropdownMenu/DropdownMenu'

type UseSortMenuResult = {
  sortMenu: ReactElement
}

export function useSortMenu(): UseSortMenuResult {
  const { t } = useTranslation()

  const { changeProjectsSortOrder } = useGroupActions()
  const projectsSortOrder = useAppSelector(
    (state) => state.settings.projectsSortOrder,
  )

  const getSortLabel = useCallback(
    ({ sortBy, sortOrder }: ProjectsSortOrder) =>
      `${t(`projects:labels.${sortBy}`)} (${t(`common:terms.${sortOrder}`)})`,
    [t],
  )

  const sortButtonLabel = useMemo(
    () =>
      getSortLabel({
        sortBy: projectsSortOrder.sortBy,
        sortOrder: projectsSortOrder.sortOrder,
      }),
    [getSortLabel, projectsSortOrder],
  )

  function createSortMenuItem(
    sortBy: ProjectsSortOrder['sortBy'],
    sortOrder: ProjectsSortOrder['sortOrder'],
  ): DropdownMenuItem {
    return {
      type: 'button',

      label: getSortLabel({ sortBy, sortOrder }),

      checked:
        projectsSortOrder.sortBy === sortBy &&
        projectsSortOrder.sortOrder === sortOrder,

      action() {
        changeProjectsSortOrder({ sortBy, sortOrder })
      },
    }
  }

  const sortMenu = (
    <DropdownMenu
      buttonType="flat"
      buttonSize="small"
      align="right"
      icon={<ArrowsUpDownIcon />}
      items={[
        createSortMenuItem('name', 'ascending'),
        createSortMenuItem('name', 'descending'),
        createSortMenuItem('projectNumber', 'ascending'),
        createSortMenuItem('projectNumber', 'descending'),
      ]}
    >
      {sortButtonLabel}
    </DropdownMenu>
  )

  return { sortMenu }
}
