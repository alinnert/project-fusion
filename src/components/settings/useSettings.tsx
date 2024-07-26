import {
  InformationCircleIcon,
  LinkIcon,
  TagIcon,
  WindowIcon,
} from '@heroicons/react/20/solid'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import colors from 'tailwindcss/colors'
import { CategorizedLinkItems, LinkItem } from '../ui/LinkList'

type UseSettingsResult = {
  settingsItems: CategorizedLinkItems
  applicationSettings: Record<string, LinkItem>
  databaseSettings: Record<string, LinkItem>
}

export function useSettings(): UseSettingsResult {
  const { t } = useTranslation()

  const applicationSettings = useMemo<Record<string, LinkItem>>(() => {
    return {
      interface: {
        id: 'interface',
        name: t('settings:navigation.application.items.interface'),
        icon: <WindowIcon />,
        iconColor: colors.yellow[700],
      },
      about: {
        id: 'about',
        name: t('settings:navigation.application.items.about'),
        icon: <InformationCircleIcon />,
        iconColor: colors.sky[700],
      },
    }
  }, [t])

  const databaseSettings = useMemo<Record<string, LinkItem>>(() => {
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
        { id: 'application', name: t('settings:navigation.application.label') },
        Object.values(applicationSettings),
      ],
      [
        { id: 'database', name: t('settings:navigation.database.label') },
        Object.values(databaseSettings),
      ],
    ]
  }, [applicationSettings, databaseSettings, t])

  return { settingsItems, applicationSettings, databaseSettings }
}
