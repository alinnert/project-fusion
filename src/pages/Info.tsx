import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PageContent } from '../components/ui/PageContent'

export const Info: FC = () => {
  const { t } = useTranslation()

  return (
    <PageContent
      title={t('info:title') ?? undefined}
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
          {t('info:sourceCode')}:{' '}
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

        <h3>{t('info:usedTechnology.title')}</h3>

        <p>
          <strong>{t('info:usedTechnology.base')}</strong>
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
          <strong>{t('info:usedTechnology.libs')}</strong>
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
            <a href="https://github.com/jakearchibald/idb-keyval">idb-keyval</a>
          </li>
          <li>
            <a href="https://github.com/markedjs/marked">marked</a>
          </li>
          <li>
            <a href="https://github.com/ai/nanoid">nanoid</a>
          </li>
        </ul>

        <p>
          <strong>{t('info:usedTechnology.apis')}</strong>
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
  )
}
