import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PageContent } from '../components/ui/PageContent'
import { translationNamespaces } from '../utils/i18next-namespaces'

export const Info: FC = () => {
  const { t } = useTranslation(translationNamespaces)

  return (
    <PageContent title={t('info:title')} centered={true}>
      <div className="prose prose-brand select-text">
        <p className="font-semibold">
          {t('info:version')} 0.0.0.42
          if-you-use-this-in-production-kittens-will-die-pre-alpha
        </p>

        <img
          src="/icon-gradient.svg"
          alt="ProjectFusion Logo"
          width="128"
          height="128"
        />

        <p>
          {t('info:sourceCode')}:{' '}
          <a href="https://github.com/alinnert/project-fusion">
            github.com/alinnert/project-fusion
          </a>
        </p>

        <p>
          <strong>{t('info:usedTechnology')}</strong>
        </p>

        <ul>
          <li>
            <a href="https://www.typescriptlang.org">TypeScript</a>
          </li>
          <li>
            <a href="https://reactjs.org">React</a>
          </li>
          <li>
            <a href="https://nextjs.org">Next.js</a>
          </li>
          <li>
            <a href="https://redux-toolkit.js.org">Redux Toolkit</a>
          </li>
          <li>
            <a href="https://tailwindcss.com">Tailwind CSS</a>
          </li>
          <li>
            <a href="https://headlessui.dev">Headless UI</a>
          </li>
          <li>
            <a href="https://heroicons.com">Heroicons</a>
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
