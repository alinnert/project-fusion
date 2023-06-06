import { FolderIcon } from '@heroicons/react/20/solid'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { GroupEditForm } from '../../components/groups/groupEditForm/GroupEditForm'
import { useGroupFromRoute } from '../../components/groups/useGroupFromRoute'
import { EmptyText } from '../../components/ui/EmptyText'

export const EditGroup: FC = () => {
  const { t } = useTranslation()

  const { group } = useGroupFromRoute()

  if (group === null) {
    return (
      <EmptyText
        icon={<FolderIcon />}
        title={t('groups:empty.title') ?? undefined}
      >
        {t('groups:empty.body')}
      </EmptyText>
    )
  }

  return <GroupEditForm init={group} />
}
