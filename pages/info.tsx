import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import { Layout } from '../components/app/Layout'
import { PageContent } from '../components/ui/PageContent'
import LogoPicture from '../public/icon-gradient.svg'
import { getPageTitle } from '../utils/getPageTitle'
import { getServerSideTranslations } from '../utils/getServerSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await getServerSideTranslations(locale)
  return { props: { ...translations } }
}

export default function Info(): ReactElement | null {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{getPageTitle('Info')}</title>
      </Head>

      <Layout>
        <PageContent title={t('info:title')} centered={true}>
          <div className="prose prose-brand select-text">
            <p className="font-semibold">
              {t('info:version')} 0.0.0.42
              if-you-use-this-in-production-kittens-will-die-pre-alpha
            </p>

            <Image
              src={LogoPicture}
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
              <li>
                <a href="https://web.dev/file-system-access">
                  File System Access API
                </a>
              </li>
            </ul>
          </div>
        </PageContent>
      </Layout>
    </>
  )
}
