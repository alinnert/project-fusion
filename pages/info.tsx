import Head from 'next/head'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import { Layout } from '../components/app/Layout'
import { PageContent } from '../components/ui/PageContent'
import LogoPicture from '../public/icon-128.png'
import { getPageTitle } from '../tools/getPageTitle'

export default function Info(): ReactElement | null {
  return (
    <>
      <Head>
        <title>{getPageTitle('Info')}</title>
      </Head>

      <Layout>
        <PageContent title="Über ProjectFusion">
          <div className="prose prose-brand select-text">
            <Image src={LogoPicture} alt="ProjectFusion Logo" />

            <p>
              <i>
                Version 0.0.0.42
                if-you-use-this-in-production-kittens-will-die-pre-alpha
              </i>
            </p>

            <p>
              Repository:{' '}
              <a href="https://github.com/alinnert/project-fusion">
                github.com/alinnert/project-fusion
              </a>
            </p>

            <p>
              <strong>Verwendete Technologien:</strong>
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
              <li>Native File System API</li>
            </ul>
          </div>
        </PageContent>
      </Layout>
    </>
  )
}
