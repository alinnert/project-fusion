import { LinkIcon, TagIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import colors from 'tailwindcss/colors'
import { CategorizedLinkItems } from '../ui/VerticalLinkList'

export function useSettings() {
  const { t } = useTranslation()

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
