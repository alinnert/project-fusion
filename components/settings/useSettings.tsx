import { LinkIcon, TagIcon } from '@heroicons/react/solid'
import { useMemo } from 'react'
import colors from 'tailwindcss/colors'
import { CategorizedLinkItems } from '../ui/VerticalLinkList'

export function useSettings() {
  const databaseSettings = useMemo(() => {
    return {
      categories: {
        id: 'categories',
        name: 'Kategorien',
        icon: <TagIcon />,
        iconColor: colors.rose[700],
      },
      links: {
        id: 'links',
        name: 'Links',
        icon: <LinkIcon />,
        iconColor: colors.sky[700],
      },
    }
  }, [])

  const settingsItems = useMemo<CategorizedLinkItems>(() => {
    return [
      [{ id: 'database', name: 'Datenbank' }, Object.values(databaseSettings)],
    ]
  }, [databaseSettings])

  return { settingsItems, databaseSettings }
}
