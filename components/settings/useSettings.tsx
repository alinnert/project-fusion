import { LinkIcon, TagIcon } from '@heroicons/react/solid'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import colors from 'tailwindcss/colors'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { CategorizedLinkItems } from '../ui/VerticalLinkList'

export function useSettings() {
  const { t } = useTranslation(translationNamespaces)

  const databaseSettings = useMemo(() => {
    return {
      categories: {
        id: 'categories',
        name: t('settings:navigation.database.items.categories'),
        icon: <TagIcon />,
        iconColor: colors.rose[700],
      },
      links: {
        id: 'links',
        name: t('settings:navigation.database.items.links'),
        icon: <LinkIcon />,
        iconColor: colors.sky[700],
      },
    }
  }, [t])

  const settingsItems = useMemo<CategorizedLinkItems>(() => {
    return [
      [
        { id: 'database', name: t('settings:navigation.database.label') },
        Object.values(databaseSettings),
      ],
    ]
  }, [databaseSettings, t])

  return { settingsItems, databaseSettings }
}
