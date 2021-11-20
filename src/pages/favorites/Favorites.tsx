import { StarIcon } from '@heroicons/react/outline'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { EmptyText } from '../../components/ui/EmptyText'
import { translationNamespaces } from '../../utils/i18next-namespaces'

export const Favorites: FC = () => {
  const { t } = useTranslation(translationNamespaces)

  return (
    <EmptyText
      title={t('projects:favorites.noFavorites.title')}
      icon={<StarIcon />}
    >
      {t('projects:favorites.noFavorites.body')}
    </EmptyText>
  )
}
