import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettings } from '../../components/settings/useSettings'
import { PageContent } from '../../components/ui/PageContent'
import { ToolbarContainer } from '../../components/ui/toolbar/ToolbarContainer'

export const ConfigAbout: FC = () => {
  const { t } = useTranslation()

  const { applicationSettings } = useSettings()

  return (
    <ToolbarContainer
      title={t('settings:about.title') ?? undefined}
      icon={{
        element: applicationSettings.about.icon,
        color: applicationSettings.about.iconColor,
      }}
      toolbarPadding="lg"
    >
      <PageContent
        title={t('settings:about.title') ?? undefined}
        image={{
          src: '/icon-gradient.svg',
          alt: 'Project Fusion Logo',
          width: '100',
          height: '100',
        }}
        centered
      >
        <div className="prose prose-brand select-text">
          <p>
            {t('settings:about.sourceCode')}:{' '}
            <a href="https://github.com/alinnert/project-fusion">
              github.com/alinnert/project-fusion
            </a>
          </p>

          <p>
            Issues:{' '}
            <a href="https://github.com/alinnert/project-fusion/issues">
              github.com/alinnert/project-fusion/issues
            </a>
          </p>

          <h3>{t('settings:about.usedTechnology.title')}</h3>

          <p>
            <strong>{t('settings:about.usedTechnology.base')}</strong>
          </p>

          <ul>
            <li>
              <a href="https://www.typescriptlang.org">TypeScript</a>
            </li>
            <li>
              <a href="https://reactjs.org">React</a>
            </li>
            <li>
              <a href="https://vitejs.dev">Vite</a>
            </li>
            <li>
              <a href="https://reactrouter.com/">React Router</a>
            </li>
            <li>
              <a href="https://redux-toolkit.js.org">Redux Toolkit</a>
            </li>
            <li>
              <a href="https://tailwindcss.com">Tailwind CSS</a>
            </li>
          </ul>

          <p>
            <strong>{t('settings:about.usedTechnology.libs')}</strong>
          </p>

          <ul>
            <li>
              <a href="https://heroicons.com">Heroicons</a>
            </li>
            <li>
              <a href="https://www.i18next.com">i18next</a>
            </li>
            <li>
              <a href="https://headlessui.dev">Headless UI</a>
            </li>
            <li>
              <a href="https://github.com/JedWatson/classnames">classnames</a>
            </li>
            <li>
              <a href="https://github.com/jakearchibald/idb-keyval">
                idb-keyval
              </a>
            </li>
            <li>
              <a href="https://github.com/markedjs/marked">marked</a>
            </li>
            <li>
              <a href="https://github.com/ai/nanoid">nanoid</a>
            </li>
          </ul>

          <p>
            <strong>{t('settings:about.usedTechnology.apis')}</strong>
          </p>

          <ul>
            <li>
              <a href="https://web.dev/file-system-access">
                File System Access API
              </a>
            </li>
          </ul>
        </div>
      </PageContent>
    </ToolbarContainer>
  )
}
