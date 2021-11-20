import { FolderIcon } from '@heroicons/react/solid'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { GroupEditForm } from '../../components/groups/GroupEditForm'
import { useGroupFromRoute } from '../../components/groups/useGroupFromRoute'
import { EmptyText } from '../../components/ui/EmptyText'
import { translationNamespaces } from '../../utils/i18next-namespaces'

export const EditGroup: FC = () => {
  const { t } = useTranslation(translationNamespaces)

  const { group } = useGroupFromRoute()

  if (group === null) {
    return (
      <EmptyText icon={<FolderIcon />} title={t('groups:empty.title')}>
        {t('groups:empty.body')}
      </EmptyText>
    )
  }

  return <GroupEditForm init={group} />
}
